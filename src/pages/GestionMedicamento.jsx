import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiCartAdd } from 'react-icons/bi';

const GestionMedicamento = () => {
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

    return (
      <>
        <div className="container h-100 w-100">
            <h2 className="display-4 text-center mb-4">Medicamentos</h2>

            <div className="w-100 col">
                
                <div className='row mb-3'>
                    <h4>Buscar Producto</h4>
                    <h6 className='text-secondary mb-4'>Buscar medicamento por nombre</h6>
                    <div className="d-flex align-items-center">
                        <input type="text" className='form-control mr-2' id='searchProduct' />
                        <button className='btn btn-primary mx-2 w-25'>
                            <AiOutlineSearch /> Buscar 
                        </button>
                        <button className="btn btn-success w-25 ml-3">
                            <BiCartAdd/> Agregar
                        </button>
                    </div>
                </div>

                <div className='row'>
                    {resultadosBusqueda.length ? (
                        <div className="tableContainer">
                            <h2>Alertas de Suministro</h2>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Categoria</th>
                                        <th>Cantidad</th>
                                        <th>Alerta</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultadosBusqueda.map(item => (
                                        <tr key={item.name}>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.quantity} {item.unit}</td>
                                            <td>Alerta por existencias</td>
                                            <td>
                                                <button className="btn btn-primary">Reabastece</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center m-4">
                            <h2>No hay resultados</h2>
                            <p>Parece que no hemos encontrado el sistema</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </>
    );
}

export default GestionMedicamento;
