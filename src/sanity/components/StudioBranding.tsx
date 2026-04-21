import logoBlack from '../../assets/Photo/logo-black.png'

export const StudioLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }}>
      <img 
        src={logoBlack} 
        alt="3NT STUDIO Logo" 
        style={{ 
          height: '24px', 
          width: 'auto',
          display: 'block',
          filter: 'brightness(0)' // Memastikan logo benar-benar hitam pekat
        }} 
      />
      <div style={{
        height: '20px',
        width: '1px',
        background: '#e5e5e5',
        margin: '0 4px'
      }} />
      <span style={{ 
        fontWeight: 600, 
        letterSpacing: '0.2em', 
        fontSize: '11px',
        fontFamily: 'Inter, sans-serif',
        color: '#666',
        textTransform: 'uppercase'
      }}>
        Admin Dashboard
      </span>
    </div>
  )
}

export const StudioIcon = () => {
  return (
    <img 
      src={logoBlack} 
      alt="3NT STUDIO Icon" 
      style={{ 
        height: '20px', 
        width: 'auto',
        display: 'block',
        filter: 'brightness(0)'
      }} 
    />
  )
}

export const StudioNavbar = (props: any) => {
  return (
    <div style={{ 
      borderBottom: '1px solid #f0f0f0',
      background: '#fff'
    }}>
      {props.renderDefault(props)}
    </div>
  )
}
