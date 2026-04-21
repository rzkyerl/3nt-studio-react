import logoBlack from '../../assets/Photo/logo-black.png'

export const StudioLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img 
        src={logoBlack} 
        alt="3NT STUDIO Logo" 
        style={{ 
          height: '28px', 
          width: 'auto',
          display: 'block'
        }} 
      />
      <span style={{ 
        fontWeight: 700, 
        letterSpacing: '0.15em', 
        fontSize: '14px',
        fontFamily: '"Playfair Display", serif',
        color: '#000',
        borderLeft: '1px solid #ddd',
        paddingLeft: '12px'
      }}>
        CONTROL CENTER
      </span>
    </div>
  )
}

export const StudioNavbar = (props: any) => {
  return (
    <div style={{ borderBottom: '1px solid #eee' }}>
      {props.renderDefault(props)}
    </div>
  )
}
