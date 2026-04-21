import { useColorScheme } from 'sanity'

export const StudioLogo = () => {
  const { scheme } = useColorScheme()
  const isDark = scheme === 'dark'
  const logoSrc = isDark ? '/logo-white.png' : '/logo-black.png'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }}>
      <img 
        src={logoSrc} 
        alt="3NT STUDIO Logo" 
        style={{ 
          height: '24px', 
          width: 'auto',
          display: 'block'
        }} 
      />
      <div style={{
        height: '20px',
        width: '1px',
        background: isDark ? '#333' : '#e5e5e5',
        margin: '0 4px'
      }} />
      <span style={{ 
        fontWeight: 600, 
        letterSpacing: '0.2em', 
        fontSize: '11px',
        fontFamily: 'Inter, sans-serif',
        color: isDark ? '#999' : '#666',
        textTransform: 'uppercase'
      }}>
        Admin Dashboard
      </span>
    </div>
  )
}

export const StudioIcon = () => {
  const { scheme } = useColorScheme()
  const isDark = scheme === 'dark'
  const logoSrc = isDark ? '/logo-white.png' : '/logo-black.png'

  return (
    <img 
      src={logoSrc} 
      alt="3NT STUDIO Icon" 
      style={{ 
        height: '20px', 
        width: 'auto',
        display: 'block'
      }} 
    />
  )
}

export const StudioNavbar = (props: any) => {
  const { scheme } = useColorScheme()
  const isDark = scheme === 'dark'

  return (
    <div style={{ 
      borderBottom: `1px solid ${isDark ? '#222' : '#f0f0f0'}`,
      background: isDark ? '#101112' : '#fff'
    }}>
      {props.renderDefault(props)}
    </div>
  )
}
