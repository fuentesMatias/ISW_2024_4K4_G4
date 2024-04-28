import React, { useState } from 'react'
import { Paper, Container, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Accordion } from '@mui/material'

import SimpleBackdrop from './SimpleBackdrop'
import VisuallyHiddenInput from './VisuallyHiddenInput'
import { useNavigate } from 'react-router-dom'
import AlertaError from './AlertaError'
import { lightBlue } from '@mui/material/colors';

const LIGHT_BLUE_COLOR = lightBlue[500300];
const FormularioPedidoEnvio = () => {
  const navigate = useNavigate()
  // Estados para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    tipoDeCarga: '',
    domicilioRetiro: {
      calle: '',
      numero: '',
      localidad: '',
      provincia: '',
      referencia: ''
    },
    domicilioEntrega: {
      calle: '',
      numero: '',
      localidad: '',
      provincia: '',
      referencia: ''
    },
    fechaRetiro: 'date',
    fechaEntrega: 'date',
    descripcion: '',
    email: '',
    foto: 'string'
  })
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [openSuccess, setOpenSuccess] = React.useState(false)

  // Estado para almacenar los errores de validación
  const [formErrors, setFormErrors] = useState({})

  // Estado para el backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false)

  // Estado para mostrar error
  const [openError, setOpenError] = useState(false)

  // Manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target
    const errors = { ...formErrors }
    setFormErrors(errors)
    if (name.includes('.')) {
      const [firstProp, secondProp] = name.split('.');
      setFormData({
        ...formData,
        [firstProp]: {
          ...formData[firstProp],
          [secondProp]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  console.log(formData)

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault()

    const errors = { ...formErrors }

    // Verificar si el campo "Nombre" está vacío
    if (formData.nombre.trim() === '') {
      errors.nombre = 'El campo "Nombre" no puede estar vacío'
    }
    // Verficar si el campo Esterilizado esta vacio
    if (formData.esterilizado === '') {
      errors.esterilizado = 'Debe seleccionar una opción en "Esterilizado"'
    }
    setFormErrors(errors)

    // Si hay errores, no enviar el formulario
    if (Object.values(errors).some((error) => error !== '')) {
      return
    }

    setOpenConfirm(true)
  }

  const handleConfirm = async () => {
    setOpenConfirm(false)
    setOpenBackdrop(true)
    // Aquí va el código para enviar los datos
    try {
      // Crear un nuevo objeto formData con la fecha formateada
      const formattedFormData = {
        ...formData,
        foto: selectedFile || null
      }
      console.log(formattedFormData)

      // Enviar datos a la API
      setOpenBackdrop(true)
      // Simular un tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Manejar la respuesta de la API
      setOpenBackdrop(false)
      setOpenSuccess(true)
      // limpio los campos
      setFormData({
        tipoDeCarga: '',
        domicilioRetiro: {
          calleNumero: '',
          localidad: '',
          provincia: '',
          referencia: ''
        },
        domicilioEntrega: {
          calleNumero: '',
          localidad: '',
          provincia: '',
          referencia: ''
        },
        fechaRetiro: 'date',
        fechaEntrega: 'date',
        descripcion: '',
        email: '',
        foto: 'string'
      })
      setSelectedFile(null)
      setOpenError(false)
    } catch (error) {
      console.error(error)
      setOpenBackdrop(false)
      // alert("Ha ocurrido un error!, toca el boton para ser redirigido a la pagina principal.");
      // navigate("/home");
      setOpenError(true)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '45px' }}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom fontFamily={'Rubik, sans-serif'} fontSize='1.75em'>
                Publicar Pedido de Envio
              </Typography>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12} textAlign={'left'}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Tipo de Carga *</InputLabel>
             <Select
                style={ { fontFamily: 'Rubik, sans-serif' } }
                label="Tipo de Carga"
                variant='outlined'
                name='tipoDeCarga'
                fullWidth
                value={formData.tipoDeCarga}
                onChange={e => handleInputChange(e)}
                color={LIGHT_BLUE_COLOR}
              >
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'documentacion'}>Documentación</MenuItem>
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'paquete'}>Paquete</MenuItem>
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'granos'}>Granos</MenuItem>
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'hacienda'}>Hacienda</MenuItem>
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontFamily={'Rubik, sans-serif'}>
                Domicilio de Entrega
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Calle"
                variant="standard"
                fullWidth
                name="domicilioEntrega.calle"
                value={formData.domicilioEntrega.calle}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Numero"
                variant="standard"
                fullWidth
                name="domicilioEntrega.numero"
                value={formData.domicilioEntrega.numero}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Localidad"
                variant="standard"
                fullWidth
                name="domicilioEntrega.localidad"
                value={formData.domicilioEntrega.localidad}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Provincia"
                variant="standard"
                fullWidth
                name="domicilioEntrega.provincia"
                value={formData.domicilioEntrega.provincia}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
              />
            </Grid>
            <Grid item xs={12} marginY='0.85em'>
              <TextField
                label="Referencia (opcional)"
                variant="outlined"
                multiline
                fullWidth
                name="domicilioEntrega.referencia"
                value={formData.domicilioEntrega.referencia}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
                />
            </Grid>
            <Grid item xs={12} marginY='0.75em'>
              <TextField
                label="Fecha de Entrega"
                variant="outlined"
                type="date"
                fullWidth
                name="fechaEntrega"
                value={formData.fechaEntrega}
                onChange={handleInputChange}
                error={!!formErrors.fechaEntrega}
                helperText={formErrors.fechaEntrega}
                color={LIGHT_BLUE_COLOR}
                />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontFamily={'Rubik, sans-serif'}>
                Domicilio de Retiro
              </Typography>
            </Grid>
            <Accordion>
            <Grid item xs={12}>
              <TextField
                label="Calle"
                variant="standard"
                fullWidth
                name="domicilioRetiro.calle"
                value={formData.domicilioRetiro.calle}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
                />
              <TextField
                label="Número"
                variant="standard"
                fullWidth
                name="domicilioRetiro.calleNumero"
                value={formData.domicilioRetiro.numero}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Localidad"
                variant="standard"
                fullWidth
                name="domicilioRetiro.localidad"
                value={formData.domicilioRetiro.localidad}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Provincia"
                variant="standard"
                fullWidth
                name="domicilioRetiro.provincia"
                value={formData.domicilioRetiro.provincia}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
                />
            </Grid>
            <Grid item xs={12} marginY='0.85em'>
              <TextField
                label="Referencia (opcional)"
                variant="outlined"
                fullWidth
                multiline
                name="domicilioRetiro.referencia"
                value={formData.domicilioRetiro.referencia}
                onChange={handleInputChange}
                color={LIGHT_BLUE_COLOR}
              />
            </Grid>
            <Grid item xs={12} marginY='0.75em'>
              <TextField
                label="Fecha de Retiro"
                variant="outlined"
                type="date"
                fullWidth
                name="fechaRetiro"
                value={formData.fechaRetiro}
                onChange={handleInputChange}
                error={!!formErrors.fechaRetiro}
                helperText={formErrors.fechaRetiro}
              />
            </Grid>
            </Accordion>
            <Grid item xs={12} >
              <VisuallyHiddenInput setSelectedFile={setSelectedFile} />
            </Grid>
            <Divider />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: '16px',
              backgroundColor: '#6fbe56',
              '&:hover': {
                backgroundColor: '#6fbe56',
                filter: 'brightness(1.1)'
              }
            }}
            style={
              {
                fontFamily: 'Rubik, sans-serif',
                fontWeight: '500',
                fontSize: '0.95em'
              }
            }
            fullWidth
          >
            Registrar
          </Button>
          <SimpleBackdrop open={openBackdrop} />
        </form>
      </Paper>
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="confirm-dialog"
      >
        <DialogTitle id="confirm-dialog">Confirmar Registro</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            ¿Está seguro que quiere confirmar el registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
        <DialogTitle id="success-dialog">Registro Exitoso</DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            El cliente se registró exitosamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenSuccess(false)
              navigate('/home')
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {openError && <AlertaError />}
    </Container>
  )
}

export default FormularioPedidoEnvio
