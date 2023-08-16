import React, { useEffect, useState } from 'react';
import { apiRefugio } from '../components/apis/Endpoint';
import { TbTruckDelivery } from 'react-icons/tb';
import DataList from '../components/Datalist';
import Swal from "sweetalert2";

const EntregaSuministros = () => {

  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const INITIAL_FORM = {
    "cantidad": 0
  };
  const [form, setForm] = useState(INITIAL_FORM);

  const buscarProductoPorNombre = () => {
    let input = document.getElementById("searchAlimento");
    console.log(input.value);
    if (input && input.value) {
      fetch(apiRefugio.url + apiRefugio.producto.listar_producto)
        .then(res => res.json())
        .then(productos => {
          const alimentosFiltrados = productos.filter(item =>
            item.type === "Alimento" && item.name.includes(input.value)
          );
          setResultadosBusqueda(alimentosFiltrados);
          console.log(alimentosFiltrados);
        });
    }
  };

  const getAllProductos = () => {
    fetch(apiRefugio.url + apiRefugio.producto.listar_producto, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        const alimentos = res.filter(item => item.type === "Alimento");
        setResultadosBusqueda(alimentos);
        console.log(alimentos);
      });
  }

  useEffect(() => {
    getAllProductos();
  }, []);

  return (
    <>
      <div className="container h-100 w-100">
        <h2 className="display-4 text-center mb-4">Entrega Alimentos</h2>
        <div className="w-100 col">

          <div className='row mb-3'>
            <h4>Buscar Alimento</h4>
            <h6 className='text-secondary mb-4'>Buscar alimento por nombre</h6>
            <div className="d-flex align-items-center">
              <DataList className='form-control mr-2' data={resultadosBusqueda} listId="resultados" inputId="resultados-input" />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default EntregaSuministros;
