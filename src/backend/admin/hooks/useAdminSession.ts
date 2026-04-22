import { useState, useEffect, useCallback } from 'react'

const SESSION_KEY = 'admin_session_timestamp'
const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // 30 menit

/**
 * Hook to manage admin session activity and timeouts.
 */
export function useAdminSession() {
  const [isSessionValid, setIsSessionValid] = useState<boolean | null>(null) // null = checking

  /**
   * Cek apakah Sanity memiliki auth token di localStorage.
   */
  const hasSanityToken = useCallback((): boolean => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key) continue
      const lower = key.toLowerCase()
      // Sanity v3 biasanya menyimpan session dengan prefix 'sanitySession:'
      // atau key lain yang mengandung 'sanity', 'auth', atau 'token'.
      if (lower.includes('sanity') || lower.includes('auth') || lower.includes('token')) {
        const val = localStorage.getItem(key)
        if (val && val.length > 20) return true
      }
    }
    return false
  }, [])

  /**
   * Refresh the session timestamp.
   */
  const refreshSession = useCallback(() => {
    localStorage.setItem(SESSION_KEY, Date.now().toString())
    setIsSessionValid(true)
  }, [])

  /**
   * Clear the session and Sanity auth data.
   */
  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    
    // Nuclear approach: hapus semua key yang terkait Sanity agar Studio ter-logout
    const toRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key) continue
      const lower = key.toLowerCase()
      if (
        lower.includes('sanity') ||
        lower.includes('auth') ||
        lower.includes('token') ||
        lower.includes('session') ||
        lower.startsWith('@@')
      ) {
        toRemove.push(key)
      }
    }
    toRemove.forEach(k => localStorage.removeItem(k))
    
    setIsSessionValid(false)
  }, [])

  /**
   * Cek status sesi saat ini.
   */
  const checkSession = useCallback(() => {
    const raw = localStorage.getItem(SESSION_KEY)
    const hasToken = hasSanityToken()
    
    if (!raw) {
      // Jika tidak ada timestamp tapi ada token, buat timestamp baru (misal setelah refresh)
      if (hasToken) {
        refreshSession()
        return true
      }
      setIsSessionValid(false)
      return false
    }

    const lastActive = parseInt(raw, 10)
    const elapsed = Date.now() - lastActive

    if (elapsed >= SESSION_TIMEOUT_MS) {
      // Jika waktu habis, clear semuanya
      if (hasToken) {
        clearSession()
      } else {
        setIsSessionValid(false)
      }
      return false
    }

    // Jika waktu belum habis dan ada token, sesi valid
    if (hasToken) {
      setIsSessionValid(true)
      return true
    } else {
      // Jika waktu belum habis tapi token hilang (logout manual via Sanity)
      localStorage.removeItem(SESSION_KEY)
      setIsSessionValid(false)
      return false
    }
  }, [clearSession, refreshSession, hasSanityToken])

  useEffect(() => {
    // 1. Cek saat mount
    checkSession()

    // 2. Cek berkala setiap 30 detik (untuk mendeteksi timeout saat user diam)
    const interval = setInterval(checkSession, 30000)

    // 3. Lacak aktivitas user untuk memperbarui timestamp
    const handleActivity = () => {
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) {
        const lastActive = parseInt(raw, 10)
        const elapsed = Date.now() - lastActive
        
        // Hanya perbarui jika sesi belum benar-benar mati
        if (elapsed < SESSION_TIMEOUT_MS) {
          refreshSession()
        }
      } else if (hasSanityToken()) {
        // Jika token ada tapi timestamp hilang (tab baru), buat timestamp
        refreshSession()
      }
    }

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
    events.forEach(event => document.addEventListener(event, handleActivity))

    // 4. Cek saat tab kembali aktif
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkSession()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      clearInterval(interval)
      events.forEach(event => document.removeEventListener(event, handleActivity))
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [checkSession, refreshSession, hasSanityToken])

  return { isSessionValid, refreshSession, clearSession, hasSanityToken }
}
