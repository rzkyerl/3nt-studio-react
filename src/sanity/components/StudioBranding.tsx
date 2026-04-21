export const StudioLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        background: '#000',
        color: '#fff',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        fontWeight: 'bold',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif'
      }}>
        3
      </div>
      <span style={{ 
        fontWeight: 700, 
        letterSpacing: '0.1em', 
        fontSize: '14px',
        fontFamily: '"Playfair Display", serif',
        color: '#000'
      }}>
        3NT STUDIO
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
