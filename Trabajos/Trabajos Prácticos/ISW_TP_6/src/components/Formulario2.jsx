import React, { useState } from 'react'
import {
  Paper,
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'

import SimpleBackdrop from './SimpleBackdrop'
import VisuallyHiddenInput from './VisuallyHiddenInput'
import { useNavigate } from 'react-router-dom'
import AlertaError from './AlertaError'
import { lightBlue } from '@mui/material/colors'

const LIGHT_BLUE_COLOR = lightBlue[500300]

const Formulario2 = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    tipoDeCarga: '',
    domicilioRetiro: {
      calle: '',
      numero: '',
      localidad: '',
      provincia: '',
      referencia: '' // Referencia opcional
    },
    domicilioEntrega: {
      calle: '',
      numero: '',
      localidad: '',
      provincia: '',
      referencia: '' // Referencia opcional
    },
    fechaRetiro: '',
    fechaEntrega: '',
    descripcion: '',
    email: '',
    foto: null // Sin foto por defecto
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [accordionRetiro, setAccordionRetiro] = useState(false)
  const [accordionEntrega, setAccordionEntrega] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [openError, setOpenError] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    const errors = { ...formErrors }
    setFormErrors(errors)
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

  const handleOpenRetiro = () => {
    setAccordionRetiro(!accordionRetiro)
  }

  const handleOpenEntrega = () => {
    setAccordionEntrega(!accordionEntrega)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const errors = { ...formErrors }

    // Validación de campos obligatorios
    const mandatoryFields = [
      'tipoDeCarga',
      'domicilioRetiro.calle',
      'domicilioRetiro.numero',
      'domicilioRetiro.localidad',
      'domicilioRetiro.provincia',
      'domicilioEntrega.calle',
      'domicilioEntrega.numero',
      'domicilioEntrega.localidad',
      'domicilioEntrega.provincia',
      'fechaRetiro',
      'fechaEntrega',
      'descripcion',
      'email'
    ]

    mandatoryFields.forEach((field) => {
      if (formData[field] === '') {
        errors[field] = `El campo ${field} es obligatorio`
      }
    })

    // Validación de fechas
    const currentDate = new Date()
    const fechaRetiro = new Date(formData.fechaRetiro)
    const fechaEntrega = new Date(formData.fechaEntrega)

    if (fechaRetiro < currentDate) {
      errors['fechaRetiro'] = 'La fecha de retiro debe ser mayor o igual a la fecha actual'
    }

    if (fechaEntrega < currentDate) {
      errors['fechaEntrega'] = 'La fecha de entrega debe ser mayor o igual a la fecha actual'
    }

    if (fechaEntrega < fechaRetiro) {
      errors['fechaEntrega'] = 'La fecha de entrega debe ser mayor o igual a la fecha de retiro'
    }

    // Removemos el campo de referencia de los errores
    delete errors['domicilioRetiro.referencia']
    delete errors['domicilioEntrega.referencia']

    setFormErrors(errors)

    if (Object.values(errors).some((error) => error !== '')) {
      return
    }

    setOpenConfirm(true)
  }

  const handleConfirm = async () => {
    setOpenConfirm(false)
    setOpenBackdrop(true)

    try {
      const formattedFormData = {
        ...formData,
        foto: selectedFile || null
      }

      setOpenBackdrop(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setOpenBackdrop(false)
      setOpenSuccess(true)
      setFormData({
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
        fechaRetiro: '',
        fechaEntrega: '',
        descripcion: '',
        email: '',
        foto: null
      })
      setSelectedFile(null)
      setOpenError(false)
    } catch (error) {
      console.error(error)
      setOpenBackdrop(false)
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
                Publicar Pedido de Envío
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign={'left'}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Tipo de Carga *</InputLabel>
                <Select
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                  label="Tipo de Carga"
                  variant='outlined'
                  name='tipoDeCarga'
                  fullWidth
                  value={formData.tipoDeCarga}
                  onChange={e => handleInputChange(e)}
                  color={LIGHT_BLUE_COLOR}
                >
                  <MenuItem style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' }} value={'documentacion'}>Documentación</MenuItem>
                  <MenuItem style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' }} value={'paquete'}>Paquete</MenuItem>
                  <MenuItem style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' }} value={'granos'}>Granos</MenuItem>
                  <MenuItem style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 'lighter' }} value={'hacienda'}>Hacienda</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontFamily={'Rubik, sans-serif'}>
                Domicilio de Retiro
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Accordion expanded={accordionRetiro} onChange={handleOpenRetiro}>
                <AccordionSummary id="panel-header-retiro" aria-controls="panel-content-retiro">
                  {accordionRetiro ? 'Presionar para ver menos' : 'Presionar para ver todos los datos'}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
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
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Número"
                        variant="standard"
                        fullWidth
                        name="domicilioRetiro.numero"
                        value={formData.domicilioRetiro.numero}
                        onChange={handleInputChange}
                        color={LIGHT_BLUE_COLOR}
                        type="number"
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
                    <Grid item xs={12}>
                      <TextField
                        label="Referencia (opcional)"
                        variant="outlined"
                        multiline
                        fullWidth
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
                        color={LIGHT_BLUE_COLOR}
                      />
                    </Grid>
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
              <Accordion expanded={accordionEntrega} onChange={handleOpenEntrega}>
                <AccordionSummary id="panel-header-entrega" aria-controls="panel-content-entrega">
                  {accordionEntrega ? 'Presionar para ver menos' : 'Presionar para ver todos los datos'}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
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
                        label="Número"
                        variant="standard"
                        fullWidth
                        name="domicilioEntrega.numero"
                        value={formData.domicilioEntrega.numero}
                        onChange={handleInputChange}
                        color={LIGHT_BLUE_COLOR}
                        type="number"
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
                    <Grid item xs={12}>
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
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
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
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontWeight: '500',
              fontSize: '0.95em'
            }}
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

export default Formulario2
