import AppBar from '@mui/material/AppBar'
import { Box } from '@mui/material'
import image from '../assets/tango-app-logo.svg'

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgb(106,188,249)',
        background: 'linear-gradient(336deg, rgba(106,188,249,1) 5%, rgba(117,191,249,1) 52%, rgba(135,230,255,1) 94%)',
        height: '4em',
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10%'
      }}
    >
      <Box display="flex" justifyContent="left" alignItems="center" padding="2em" position='relative' >
          <div style={ { position: 'absolute', width: '4.5em', height: '35px', backgroundColor: '#ffffff', borderRadius: '50%', marginLeft: '3.75%', zIndex: -1 } } />
          <img alt='tangoAppLogo' src={image} style={{ maxWidth: '100px', height: 'auto', color: 'darkgrey', marginLeft: '2.5%' }}/>
      </Box>
    </AppBar>
  )
}
export default Header
