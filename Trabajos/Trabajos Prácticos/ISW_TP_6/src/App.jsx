import './App.css'
import { Routes, Route } from 'react-router-dom'
import Inicio from './components/Inicio'
import FormularioPedidoEnvio from './components/FormularioPedidoEnvio'
import Formulario2 from './components/Formulario2'

function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/registrar" element={<FormularioPedidoEnvio />} />
        <Route path="/home" element={<Inicio/>} />

      </Routes>
    </>
  )
}

export default App
