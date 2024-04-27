import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {

  const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/registrar');
      }
    
    return (
    <>
    < p>Inicio</p>
    <Button onClick={handleButtonClick}>Registrar Pedido de Envio</Button>
    </>
    );
}

export default Inicio;