import React, {useState} from 'react';
import {Paper} from '@mui/material';
import {Container} from '@mui/material';
import {Grid} from '@mui/material';
import {Typography} from '@mui/material';
import {TextField} from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import {Select} from '@mui/material';
import {MenuItem} from '@mui/material';
import {FormHelperText} from '@mui/material';
import {Button} from '@mui/material';
import {Divider} from '@mui/material';
import {Dialog} from '@mui/material';
import {DialogTitle} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {DialogActions} from '@mui/material';
import SimpleBackdrop from './SimpleBackdrop';
import VisuallyHiddenInput from './VisuallyHiddenInput';
import {format, addDays} from 'date-fns';
import {useNavigate} from 'react-router-dom';
import AlertaError from './AlertaError';
const FormularioPedidoEnvio = () => {
  const navigate = useNavigate();
  // Estados para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    peso: '',
    sexo: '',
    fechaNacimiento: 'date',
    esterilizado: '',
    descripcion: '',
    responsableId: 0,
    nombreResponsable: '',
    apellidoResponsable: '',
    emailResponsable: '',
    telefonoResponsable: '',
    foto: 'string',
  });
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  
  // Estado para almacenar los errores de validación
  const [formErrors, setFormErrors] = useState({});
  
  // Estado para el backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  
  // Estado para mostrar error
  const [openError, setOpenError] = useState(false);
  
    // Manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const {name, value} = event.target;
  
    let errors = {...formErrors};
  
    // Validación para el campo "Nombre"
    if (name === 'nombre' && value.trim() === '') {
      errors.nombre = 'El campo "Nombre" no puede estar vacío';
    } else {
      errors[name] = '';
    }
  
    setFormErrors(errors);
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let errors = {...formErrors};
  
    // Verificar si el campo "Nombre" está vacío
    if (formData.nombre.trim() === '') {
      errors.nombre = 'El campo "Nombre" no puede estar vacío';
    }
    // Verficar si el campo Esterilizado esta vacio
    if (formData.esterilizado === '') {
      errors.esterilizado = 'Debe seleccionar una opción en "Esterilizado"';
    }
    setFormErrors(errors);
  
    // Si hay errores, no enviar el formulario
    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }
  
    setOpenConfirm(true);
  };

  const handleConfirm = async () => {
    setOpenConfirm(false);
    setOpenBackdrop(true);
    // Aquí va el código para enviar los datos
    try {
  
      // Crear un nuevo objeto formData con la fecha formateada
      const formattedFormData = {
        ...formData,
        fechaNacimiento:
            formData.fechaNacimiento !== 'date'
              ? format(
                  addDays(new Date(formData.fechaNacimiento), 1),
                  'yyyy-MM-dd'
              )
              : '',
        esterilizado: Number(formData.esterilizado),
        peso: Number(formData.peso),
        telefonoResponsable: Number(formData.telefonoResponsable),
        foto: selectedFile ? selectedFile : null,
        //simular un error
        //nombre: '',
            
      };
      console.log(formattedFormData);
      
      // Enviar datos a la API
      setOpenBackdrop(true);
      // Simular un tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Manejar la respuesta de la API
      setOpenBackdrop(false);
      setOpenSuccess(true);
      // limpio los campos
      setFormData({
        nombre: '',
        peso: '',
        sexo: '',
        fechaNacimiento: 'date',
        esterilizado: '',
        descripcion: '',
        responsableId: 0,
        nombreResponsable: '',
        apellidoResponsable: '',
        emailResponsable: '',
        telefonoResponsable: '',
        foto: '',
      });
      setSelectedFile(null);
      setOpenError(false);
    } 
    catch (error) {
      console.error(error);
      setOpenBackdrop(false);
      //alert("Ha ocurrido un error!, toca el boton para ser redirigido a la pagina principal.");
      //navigate("/home");
      setOpenError(true);
    }
  };


  return (
    <Container maxWidth="sm" sx={{textAlign: 'center', marginTop: '45px'}}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Registrar Paciente
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre *"
                variant="outlined"
                fullWidth
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                error={!!formErrors.nombre}
                helperText={formErrors.nombre}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Especie"
                variant="outlined"
                fullWidth
                name="especie"
                value={formData.especie}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Raza"
                variant="outlined"
                fullWidth
                name="raza"
                value={formData.raza}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} textAlign={'left'}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Sexo</InputLabel>
                <Select
                  label="Sexo"
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Macho">Macho</MenuItem>
                  <MenuItem value="Hembra">Hembra</MenuItem>
                  {/* Agrega más categorías según tus necesidades */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha de Nacimiento"
                variant="outlined"
                type="date"
                fullWidth
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                error={!!formErrors.fechaNacimiento}
                helperText={formErrors.fechaNacimiento}
              />
            </Grid>
            <Grid item xs={12} textAlign={'left'}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Esterilizado *</InputLabel>
                <Select
                  label="Esterilizado"
                  name="esterilizado"
                  value={formData.esterilizado}
                  onChange={handleInputChange}
                  error={!!formErrors.esterilizado}
                >
                  <MenuItem value="1">Si</MenuItem>
                  <MenuItem value="0">No</MenuItem>
                  {/* Agrega más categorías según tus necesidades */}
                </Select>
                <FormHelperText error={!!formErrors.esterilizado}>
                  {formErrors.esterilizado}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripcion"
                variant="outlined"
                fullWidth
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
              />
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
                filter: 'brightness(1.1)',
              },
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
              setOpenSuccess(false);
              navigate(`/home`);
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {openError && <AlertaError />}
    </Container>
  );
};

export default FormularioPedidoEnvio;