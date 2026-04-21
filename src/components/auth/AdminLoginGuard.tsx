import { useEffect, useState } from 'react'
import { Studio } from 'sanity'
import config from '../../../sanity.config'
import { useAdminSession } from '../../hooks/useAdminSession'
import './AdminLoginGuard.css'

const FORCE_LOGIN_FLAG = 'admin_force_login'

/**
 * Hapus semua data auth Sanity dari localStorage.
 * Nuclear approach: hapus semua key yang mengandung kata kunci auth.
 */
function clearSanityAuth() {
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
      lower.includes('login') ||
      lower.startsWith('@@')
    ) {
      toRemove.push(key)
    }
  }
  toRemove.forEach((k) => localStorage.removeItem(k))
}

/**
 * Cek apakah Sanity sudah menulis auth token ke localStorage
 * (digunakan untuk polling setelah user login via Sanity panel).
 */
function hasSanityAuthToken(): boolean {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key) continue
    const lower = key.toLowerCase()
    if (lower.includes('sanity') || lower.includes('auth') || lower.includes('token')) {
      const val = localStorage.getItem(key)
      // Token biasanya string panjang > 20 karakter
      if (val && val.length > 20) return true
    }
  }
  return false
}

type GuardState = 'checking' | 'expired' | 'authenticating' | 'authenticated'

export default function AdminLoginGuard() {
  const { isSessionValid, refreshSession, hasSanityToken } = useAdminSession()
  const [state, setState] = useState<GuardState>('checking')

  // ── Sinkronkan state guard dengan status sesi ──────────────────────────────
  useEffect(() => {
    if (isSessionValid === null) {
      setState('checking')
      return
    }

    // JANGAN timpa jika kita sedang aktif menunggu login (polling)
    if (state === 'authenticating') return

    // Cek apakah user baru saja reload setelah klik "Login ke Admin"
    const forceLogin = sessionStorage.getItem(FORCE_LOGIN_FLAG)
    if (forceLogin) {
      sessionStorage.removeItem(FORCE_LOGIN_FLAG)
      setState('authenticating')
      return
    }

    // Jika tidak valid, cek apakah ini "Expired" atau memang "Belum Login"
    if (!isSessionValid) {
      if (hasSanityToken()) {
        // Ada token tapi session di-mark tidak valid -> Pasti Expired (timeout)
        setState('expired')
      } else {
        // Tidak ada token -> Tampilkan Studio agar Sanity minta login
        setState('authenticated')
      }
    } else {
      setState('authenticated')
    }
  }, [isSessionValid, state, hasSanityToken])

  // ── Polling: tunggu Sanity selesai login ───────────────────────────────────
  useEffect(() => {
    if (state !== 'authenticating') return

    const interval = setInterval(() => {
      if (hasSanityToken()) {
        clearInterval(interval)
        refreshSession() // tandai sesi kita juga valid
        setState('authenticated')
      }
    }, 800)

    return () => clearInterval(interval)
  }, [state, refreshSession, hasSanityToken])

  /**
   * Klik "Login ke Admin"
   */
  const handleLogin = () => {
    sessionStorage.setItem(FORCE_LOGIN_FLAG, 'true')
    window.location.reload()
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (state === 'authenticated') {
    return <Studio config={config} />
  }

  if (state === 'checking') {
    return (
      <div className="aig-loading">
        <div className="aig-spinner" />
      </div>
    )
  }

  if (state === 'expired') {
    return (
      <div className="aig-screen">
        <div className="aig-container">
          {/* Logo / brand */}
          <div className="aig-brand">
            <div className="aig-brand-dot" />
            <span className="aig-brand-name">3NT STUDIO</span>
          </div>

          {/* Divider */}
          <div className="aig-divider" />

          {/* Icon */}
          <div className="aig-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9.5" stroke="#1a1a1a" strokeWidth="1.25" />
              <path d="M12 7v5.25l2.5 2.5" stroke="#1a1a1a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Copy */}
          <h1 className="aig-heading">Your session has expired</h1>
          <p className="aig-body">
            You've been away for more than 30 minutes. For security, please sign in again to access the admin panel.
          </p>

          {/* CTA */}
          <button className="aig-cta" onClick={handleLogin}>
            Sign In
          </button>

          {/* Footer note */}
          <p className="aig-footer">
            If you're having trouble, try clearing your browser's cache.
          </p>
        </div>
      </div>
    )
  }

  // Default: 'authenticating' state
  return (
    <div className="aig-loading">
      <div className="aig-spinner" />
      <p className="aig-body" style={{ marginTop: '1rem' }}>Authenticating...</p>
    </div>
  )
}
