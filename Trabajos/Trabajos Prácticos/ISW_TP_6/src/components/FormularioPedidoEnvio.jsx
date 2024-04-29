import React, { useState } from 'react'
import { Paper, Container, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import SimpleBackdrop from './SimpleBackdrop'
import VisuallyHiddenInput from './VisuallyHiddenInput'
import { useNavigate } from 'react-router-dom'
import AlertaError from './AlertaError'
import { lightBlue } from '@mui/material/colors'
import FormHelperText from '@mui/material/FormHelperText'
import VolverAlInicio from './VolverAlInicio' // Importa el nuevo componente
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import enviarMailPedidoDeEnvio from '../helpers/sendMail'
import transportistas from '../db/transportistas.json'

console.log(transportistas[0])

const INITIAL_FORM_STATE = {
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
}

const INITIAL_ERRORS_STATE = {
  tipoDeCarga: '',
  calleRetiro: '',
  numeroRetiro: '',
  localidadRetiro: '',
  provinciaRetiro: '',
  referenciaRetiro: '',
  calleEntrega: '',
  numeroEntrega: '',
  localidadEntrega: '',
  provinciaEntrega: '',
  referenciaEntrega: '',
  fechaRetiro: '',
  fechaEntrega: ''
}

const LIGHT_BLUE_COLOR = lightBlue[500300]
const FormularioPedidoEnvio = () => {
  const navigate = useNavigate()
  // Estados para almacenar los datos del formulario
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [openSuccess, setOpenSuccess] = React.useState(false)
  const [accordionRetiro, setAccordionRetiro] = React.useState(false)
  const [accordionEntrega, setAccordionEntrega] = React.useState(false)

  // Estado para almacenar los errores de validación
  const [formErrors, setFormErrors] = useState(INITIAL_ERRORS_STATE)

  // Estado para el backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false)

  // Estado para mostrar error
  const [openError, setOpenError] = useState(false)

  // Manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target
    // const errors = { ...formErrors }
    // if (name === 'tipoDeCarga' && value === '') {
    //   errors.tipoDeCarga = '*'
    // } else {
    //   errors.tipoDeCarga = ''
    // }
    // setFormErrors(errors)
    if (name.includes('.')) {
      const [firstProp, secondProp] = name.split('.')
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
  // console.log(formData)

  // Manejar el accordion
  const handleOpenRetiro = () => {
    setAccordionRetiro(!accordionRetiro)
  }
  // Manejar el accordion
  const handleOpenEntrega = () => {
    setAccordionEntrega(!accordionEntrega)
  }

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault()

    const errors = { }

    // Validación de fechas
    const fechaRetiro = formData.fechaRetiro
    const fechaEntrega = formData.fechaEntrega
    const currentDate = new Date()

    const añoActual = currentDate.getFullYear()
    const mesActual = String(currentDate.getMonth() + 1).padStart(2, '0')
    const diaActual = String(currentDate.getDate()).padStart(2, '0')

    const fechaActualEnFormatoDeseado = `${añoActual}-${mesActual}-${diaActual}`

    console.log('Fecha actual: ', fechaActualEnFormatoDeseado, '\nFecha de retiro:', fechaRetiro, '\nFecha de Entrega: ', fechaEntrega)

    if (fechaRetiro < fechaActualEnFormatoDeseado) {
      errors.fechaRetiro = 'La fecha de retiro debe ser mayor o igual a la fecha actual'
    }

    if (fechaEntrega < fechaActualEnFormatoDeseado) {
      errors.fechaEntrega = 'La fecha de entrega debe ser mayor o igual a la fecha actual'
    }

    if (fechaEntrega < fechaRetiro) {
      errors.fechaEntrega = 'La fecha de entrega debe ser mayor o igual a la fecha de retiro'
    }

    if (formData.tipoDeCarga === '') {
      errors.tipoDeCarga = 'Debe seleccionar una opción en "Tipo de Carga"'
    }
    if (formData?.domicilioRetiro?.calle === '') {
      errors.calleRetiro = 'El campo Calle es obligatorio.'
    }
    if (formData.domicilioRetiro.numero === '') {
      errors.numeroRetiro = 'El campo Numero es obligatorio.'
    }
    if (formData.domicilioRetiro.localidad === '') {
      errors.localidadRetiro = 'El campo Localidad es obligatorio.'
    }
    if (formData.domicilioRetiro.provincia === '') {
      errors.provinciaRetiro = 'El campo Provincia es obligatorio.'
    }
    if (formData?.domicilioEntrega?.calle === '') {
      errors.calleEntrega = 'El campo Calle es obligatorio.'
    }
    if (formData.domicilioEntrega.numero === '') {
      errors.numeroEntrega = 'El campo Numero es obligatorio.'
    }
    if (formData.domicilioEntrega.localidad === '') {
      errors.localidadEntrega = 'El campo Localidad es obligatorio.'
    }
    if (formData.domicilioEntrega.provincia === '') {
      errors.provinciaEntrega = 'El campo Provincia es obligatorio.'
    }
    if (formData.fechaRetiro === 'date') {
      errors.fechaRetiro = 'Se debe seleccionar la fecha de retiro.'
    }
    if (formData.fechaEntrega === 'date') {
      errors.fechaEntrega = 'Se debe seleccionar la fecha de entrega.'
    }

    setFormErrors(errors)

    console.log('Datos de formulario: ', formData)
    // Si hay errores, no enviar el formulario
    if (Object.values(errors).some((error) => error !== '')) {
      console.log('entro en el if de errores')
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
      if (formattedFormData.domicilioRetiro.localidad.toLowerCase() === 'cordoba' && formattedFormData.domicilioRetiro.provincia.toLowerCase() === 'cordoba') {
        enviarMailPedidoDeEnvio(`<h1><strong>Se ha detectado un pedido de Envío cercano en tu zona</strong></h1>
        <br>
        <h3>Tipo de carga: <span><h4>${formData.tipoDeCarga}</h4></span></h3>
        <h2>Datos de entrega:</h2><br>
        <h3>Domicilio: <span><h4>${formData.domicilioEntrega.calle} N°${formData.domicilioEntrega.numero}</h4></span></h3>
        <h3>Localidad: <span><h4>${formData.domicilioEntrega.localidad}</h4></span></h3>
        <h3>Provincia: <span><h4>${formData.domicilioEntrega.provincia}</h4></span></h3>
        <h3>Fecha de entrega: <span><h4>${formData.fechaEntrega}</h4></span></h3>
        <h2>Datos de retiro:</h2><br>
        <h3>Domicilio: <span><h4>${formData.domicilioRetiro.calle} N°${formData.domicilioRetiro.numero}</h4></span></h3>
        <h3>Localidad: <span><h4>${formData.domicilioRetiro.localidad}</h4></span></h3>
        <h3>Provincia: <span><h4>${formData.domicilioRetiro.provincia}</h4></span></h3>
        <h3>Fecha de retiro: <span><h4>${formData.fechaRetiro}</h4></span></h3>
        `)
        console.log('Mail enviado correctamente...')
      }
      // Enviar datos a la API
      setOpenBackdrop(true)
      // Simular un tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Manejar la respuesta de la API
      setOpenBackdrop(false)
      setOpenSuccess(true)
      // limpio los campos
      setFormData(INITIAL_FORM_STATE)
      setSelectedFile(null)
      setOpenError(false)
      setFormErrors({})
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
      <VolverAlInicio />
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
                error={!!formErrors.tipoDeCarga}
              >
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'documentacion'}>Documentación</MenuItem>
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'paquete'}>Paquete</MenuItem>
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'granos'}>Granos</MenuItem>
                <MenuItem style={ { fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' } } value={'hacienda'}>Hacienda</MenuItem>
              </Select>
              <FormHelperText error={!!formErrors.tipoDeCarga}>{formErrors.tipoDeCarga}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontFamily={'Rubik, sans-serif'}>
                Domicilio de Retiro
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary id="panel-header" aria-controls="panel-content" onClick={handleOpenRetiro}>
                  {accordionRetiro ? <KeyboardArrowUpIcon></KeyboardArrowUpIcon> : <KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item xs={12}>
                    <TextField
                      label="Calle"
                      variant="standard"
                      fullWidth
                      name="domicilioRetiro.calle"
                      value={formData.domicilioRetiro.calle}
                      onChange={handleInputChange}
                      color={LIGHT_BLUE_COLOR}
                      error={!!formErrors.calleRetiro}
                      helperText={formErrors.calleRetiro}
                      />
                  </Grid >
                  <Grid item xs={12}>
                    <TextField
                      label="Número"
                      variant="standard"
                      fullWidth
                      name="domicilioRetiro.numero"
                      value={formData.domicilioRetiro.numero}
                      error={!!formErrors.numeroRetiro}
                      helperText={formErrors.numeroRetiro}
                      onChange={handleInputChange}
                      color={LIGHT_BLUE_COLOR}
                      type='number'
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
                      error={!!formErrors.localidadRetiro}
                      helperText={formErrors.localidadRetiro}
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
                      error={!!formErrors.provinciaRetiro}
                      helperText={formErrors.provinciaRetiro}
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
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontFamily={'Rubik, sans-serif'}>
                Domicilio de Entrega
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Accordion>
                <AccordionSummary id="panel-header" aria-controls="panel-content" onClick={handleOpenEntrega}>
                  {accordionEntrega ? <KeyboardArrowUpIcon></KeyboardArrowUpIcon> : <KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
                </AccordionSummary>
                <AccordionDetails>
            <Grid item xs={12}>
              <TextField
                label="Calle"
                variant="standard"
                fullWidth
                name="domicilioEntrega.calle"
                value={formData.domicilioEntrega.calle}
                onChange={handleInputChange}
                error={!!formErrors.calleEntrega}
                helperText={formErrors.calleEntrega}
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
                error={!!formErrors.numeroEntrega}
                helperText={formErrors.numeroEntrega}
                color={LIGHT_BLUE_COLOR}
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Localidad"
                variant="standard"
                fullWidth
                name="domicilioEntrega.localidad"
                value={formData.domicilioEntrega.localidad}
                error={!!formErrors.localidadEntrega}
                helperText={formErrors.localidadEntrega}
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
                error={!!formErrors.provinciaEntrega}
                helperText={formErrors.provinciaEntrega}
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
                error={!!formErrors.referenciaEntrega}
                helperText={formErrors.referenciaEntrega}
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
            </AccordionDetails>
            </Accordion>
            </Grid>
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
              outline: 'none',
              border: 'none',
              '&:hover': {
                backgroundColor: '#6fbe56',
                filter: 'brightness(1.1)'
              },
              '&:active': {
                outline: 0,
                border: 'none'
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
        <DialogTitle id="confirm-dialog">Confirmar Pedido de Envio</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            ¿Está seguro que quiere confirmar el Pedido de Envio?
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
            El Pedido de Envio se registró exitosamente.
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
