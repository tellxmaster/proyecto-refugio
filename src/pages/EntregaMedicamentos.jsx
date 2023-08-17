import React, { useEffect, useState } from 'react';
import { apiRefugio } from '../components/apis/Endpoint';
import DataList from '../components/Datalist';
import Swal from "sweetalert2";

const EntregaMedicamentos = () => {

  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const INITIAL_FORM = {
    "cantidad": 0
  };
  const [form, setForm] = useState(INITIAL_FORM);

  const buscarMedicamentoPorNombre = () => {
    let input = document.getElementById("searchMedicamento");
    console.log(input.value);
    if (input && input.value) {
      fetch(apiRefugio.url + apiRefugio.producto.listar_producto)
        .then(res => res.json())
        .then(productos => {
          const medicamentosFiltrados = productos.filter(item =>
            item.type === "Medicamento" && item.name.includes(input.value)
          );
          setResultadosBusqueda(medicamentosFiltrados);
          console.log(medicamentosFiltrados);
        });
    }
  };

  const getAllMedicamentos = () => {
    fetch(apiRefugio.url + apiRefugio.producto.listar_producto, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        const medicamentos = res.filter(item => item.type === "Medicamento");
        setResultadosBusqueda(medicamentos);
        console.log(medicamentos);
      });
  }

  useEffect(() => {
    getAllMedicamentos();
  }, []);

  return (
    <>
      <div className="container h-100 w-100">
        <h2 className="display-4 text-center mb-4">Entrega Medicamentos</h2>
        <div className="w-100 col">

          <div className='row mb-3'>
            <h4>Buscar Medicamento</h4>
            <h6 className='text-secondary mb-4'>Buscar medicamento por nombre</h6>
            <div className="d-flex align-items-center">
              <DataList className='form-control mr-2' data={resultadosBusqueda} listId="resultadosMedicamentos" inputId="resultadosMedicamentos-input" />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default EntregaMedicamentos;
