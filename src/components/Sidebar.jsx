import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

// Importar los iconos específicos que quieres usar
import { FaHome, FaAmbulance, FaPills, FaTruckMoving } from 'react-icons/fa';
import { IoFastFood } from 'react-icons/io5';
import { MdOutlineDeliveryDining } from 'react-icons/md';

function Sidebar() {
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);

    return (
        <div className="custom-sidebar" style={{ width: '300px' }}>
            <div className="sidebar-header">
              <h3 className='text-gray'>Administración</h3>
            </div>
            <Link className="custom-sidebar-link" to="/"><FaHome style={{ marginRight: '10px' }}/> Inicio</Link>
            <Link className="custom-sidebar-link" to="/alimentos"><IoFastFood style={{ marginRight: '10px' }}/> Alimentos</Link>
            <Link className="custom-sidebar-link" to="/medicamentos"><FaPills style={{ marginRight: '10px' }}/> Medicamentos</Link>

            <button className="custom-submenu-toggle" onClick={() => setSubMenuOpen(!isSubMenuOpen)}><FaTruckMoving style={{ marginRight: '10px' }}/> Entregas</button>
            <div className="custom-submenu-content" style={{maxHeight: isSubMenuOpen ? '150px' : '0'}}>
                <Link className="custom-submenu-item" to="/entregas/alimentos"> <MdOutlineDeliveryDining/> Entregas Alimentos</Link>
                <Link className="custom-submenu-item" to="/entregas/medicamentos"><FaAmbulance/> Entregas Medicamentos</Link>
            </div>
        </div>
    );
}

export default Sidebar;
