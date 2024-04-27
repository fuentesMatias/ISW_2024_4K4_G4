import React, { useState } from 'react'
import {
  Paper,
  Container,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AlertaError from './AlertaError'
import SimpleBackdrop from './SimpleBackdrop'

const Formulario2 = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    tipoCarga: '',
    domicilioRetiro: {
      calleNumero: '',
      localidad: '',
      provincia: '',
      referencia: ''
    },
    fechaRetiro: '',
    domicilioEntrega: {
      calleNumero: '',
      localidad: '',
      provincia: '',
      referencia: ''
    },
    fechaEntrega: '',
    fotos: [] // Array para almacenar las fotos
  })
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [openError, setOpenError] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = {}

    // Validaciones de los campos
    if (formData.tipoCarga.trim() === '') {
      errors.tipoCarga = 'Debe seleccionar un tipo de carga'
    }
    // Validar otros campos requeridos según tus necesidades

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
      // Aquí enviarías los datos al servidor
      console.log(formData)
      // Simular un tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setOpenBackdrop(false)
      setOpenSuccess(true)
      setFormData({
        tipoCarga: '',
        domicilioRetiro: {
          calleNumero: '',
          localidad: '',
          provincia: '',
          referencia: ''
        },
        fechaRetiro: '',
        domicilioEntrega: {
          calleNumero: '',
          localidad: '',
          provincia: '',
          referencia: ''
        },
        fechaEntrega: '',
        fotos: []
      })
      setOpenError(false)
    } catch (error) {
      console.error(error)
      setOpenBackdrop(false)
      setOpenError(true)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setFormData({
      ...formData,
      fotos: [file]
    })
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '45px' }}>
      <Paper elevation={3} sx={{ backgroundColor: 'white', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Formulario de Pedido de Envío
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Tipo de Carga *</InputLabel>
                <Select
                  label="Tipo de Carga"
                  name="tipoCarga"
                  value={formData.tipoCarga}
                  onChange={handleInputChange}
                  error={!!formErrors.tipoCarga}
                >
                  <MenuItem value="documentacion">Documentación</MenuItem>
                  <MenuItem value="paquete">Paquete</MenuItem>
                  <MenuItem value="granos">Granos</MenuItem>
                  <MenuItem value="hacienda">Hacienda</MenuItem>
                </Select>
                <FormHelperText error={!!formErrors.tipoCarga}>{formErrors.tipoCarga}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Domicilio de Retiro
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Calle y número"
                variant="outlined"
                fullWidth
                name="domicilioRetiro.calleNumero"
                value={formData.domicilioRetiro.calleNumero}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Localidad"
                variant="outlined"
                fullWidth
                name="domicilioRetiro.localidad"
                value={formData.domicilioRetiro.localidad}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Provincia"
                variant="outlined"
                fullWidth
                name="domicilioRetiro.provincia"
                value={formData.domicilioRetiro.provincia}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Referencia (opcional)"
                variant="outlined"
                fullWidth
                name="domicilioRetiro.referencia"
                value={formData.domicilioRetiro.referencia}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Domicilio de Entrega
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Calle y número"
                variant="outlined"
                fullWidth
                name="domicilioEntrega.calleNumero"
                value={formData.domicilioEntrega.calleNumero}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Localidad"
                variant="outlined"
                fullWidth
                name="domicilioEntrega.localidad"
                value={formData.domicilioEntrega.localidad}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Provincia"
                variant="outlined"
                fullWidth
                name="domicilioEntrega.provincia"
                value={formData.domicilioEntrega.provincia}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Referencia (opcional)"
                variant="outlined"
                fullWidth
                name="domicilioEntrega.referencia"
                value={formData.domicilioEntrega.referencia}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Grid>
            {/* Agregar más campos si es necesario */}
          </Grid>
          <Button type="submit" variant="contained" sx={{ marginTop: '16px', backgroundColor: '#6fbe56', '&:hover': { backgroundColor: '#6fbe56', filter: 'brightness(1.1)' } }} fullWidth>
            Registrar
          </Button>
          <SimpleBackdrop open={openBackdrop} />
        </form>
      </Paper>
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)} aria-labelledby="confirm-dialog">
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
            El pedido se registró exitosamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenSuccess(false); navigate('/home') }} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {openError && <AlertaError />}
    </Container>
  )
}

export default Formulario2
