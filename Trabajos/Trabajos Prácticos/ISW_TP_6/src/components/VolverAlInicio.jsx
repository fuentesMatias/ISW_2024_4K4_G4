import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const VolverAlInicio = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleBackToHome}
      style={{
        background: 'linear-gradient(336deg, rgba(106,188,249,1) 5%, rgba(117,191,249,1) 52%, rgba(135,230,255,1) 94%)',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        marginTop: '20px' // Ajusta el margen superior según sea necesario
      }}
    >
      Volver al Inicio
    </Button>
  )
}

export default VolverAlInicio
