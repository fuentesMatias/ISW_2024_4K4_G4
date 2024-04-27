import AppBar from '@mui/material/AppBar'
import { Box } from '@mui/material'
import imagen from '../assets/tango-app-logo.png'

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgb(106,188,249)',
        background: 'linear-gradient(336deg, rgba(106,188,249,1) 5%, rgba(117,191,249,1) 52%, rgba(135,230,255,1) 94%)',
        height: '50px',
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10%'
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
          <img alt='tangoAppLogo' src={imagen} style={{ maxWidth: '30%', height: '32px' }}/>
      </Box>
    </AppBar>
  )
}
export default Header
