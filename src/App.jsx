import React from 'react';
import { Routes, Route } from "react-router-dom"
import Sidebar from './components/Sidebar';
import Inicio from './pages/Inicio';
import GestionAlimento from './pages/GestionAlimento';
import GestionMedicamento from './pages/GestionMedicamento';
import EntregaAlimentos from './pages/EntregaAlimentos';
import EntregaMedicamentos from './pages/EntregaMedicamentos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <div className="App">
      <div className="d-flex">
        <Sidebar/>
        <div className="content p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/alimentos" element={<GestionAlimento />} />
            <Route path="/medicamentos" element={<GestionMedicamento />} />
            <Route path="/entregas/alimentos" element={<EntregaAlimentos />} />
            <Route path="/entregas/medicamentos" element={<EntregaMedicamentos />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

