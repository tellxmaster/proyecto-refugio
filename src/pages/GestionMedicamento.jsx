import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiFillDelete } from 'react-icons/ai';
import { BiCartAdd, BiSolidEdit } from 'react-icons/bi';
import { apiRefugio } from '../components/apis/Endpoint';
import Swal from "sweetalert2";

const GestionMedicamento = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [refugios, setRefugios] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    
    const handleCloseModal = () => {
        setIsEditing(false); // resetear el estado de edición
        setForm(INITIAL_FORM); // resetear el formulario
        setOpenModal(false);
    };
    
    const INITIAL_FORM = {
        "_id": null,
        "name": "",
        "type": "Medicamento",
        "quantity": 0,
        "shelter": null
    };
    const [form, setForm] = useState(INITIAL_FORM);

    const handleOpenModal = (producto) => {
        if (producto) {
            setIsEditing(true);
            setForm(producto);
        } else {
            setIsEditing(false);
            setForm(INITIAL_FORM);
        }
        setOpenModal(true);
    };

    const handleChange = (e) => {
        if (e.target.name === "shelter") {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const key = selectedOption.getAttribute('data-key');
            console.log(key)
            setForm({
                ...form,
                shelter: key
            });
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
    };

    const getAllProductos = () => {
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

    const getRefugios = () => {
        fetch(apiRefugio.url + apiRefugio.refugio.listar_refugio, {
            method: "GET"
        })
            .then(res => res.json())
            .then(refug => {
                setRefugios(refug);
            });
    }

    const agregarProducto = () => {
        fetch(apiRefugio.url + apiRefugio.producto.nuevo_producto, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire('Registro Exitoso', data.mensaje, 'success');
                handleCloseModal();
                form.reset();
            }).finally((res) => {
                getAllProductos();
                form.reset();
                handleCloseModal();
            });
    };

    const buscarProductoPorNombre = () => {
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

    const actualizarProducto = () => {
        fetch(apiRefugio.url + apiRefugio.producto.editar_producto + form._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire('Actualización Exitosa', data.mensaje, 'success');
        }).finally(() => {
            getAllProductos();
            handleCloseModal();
        });
    };

    const eliminarProducto = (productId) => {
        fetch(apiRefugio.url + apiRefugio.producto.eliminar_producto + productId, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire('Producto Eliminado', data.mensaje, 'success');
            }).finally((res) => {
                getAllProductos();
            });
    };

    useEffect(() => {
        getRefugios();
        getAllProductos();
    }, []);

    return (
        <>
            <div className="container h-100 w-100">
                <h2 className="display-4 text-center mb-4">Medicamentos</h2>

                <div className="w-100 col">
                    <div className='row mb-3'>
                        <h4>Buscar Producto</h4>
                        <h6 className='text-secondary mb-4'>Buscar medicamento por nombre</h6>
                        <div className="d-flex align-items-center">
                            <input type="text" className='form-control mr-2' id='searchMedicamento' />
                            <button className='btn btn-primary mx-2 w-25' onClick={buscarProductoPorNombre}>
                                <AiOutlineSearch /> Buscar
                            </button>
                            <button className="btn btn-success w-25 ml-3" onClick={() => handleOpenModal(null)}>
                                <BiCartAdd /> Agregar
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
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultadosBusqueda.map(item => (
                                            <tr key={item.name}>
                                                <td>{item.name}</td>
                                                <td>{item.type}</td>
                                                <td>{item.quantity} {item.unit}</td>
                                                <td>
                                                    <button data-toggle="tooltip" title="Editar" className="btn btn-warning mx-2" onClick={() => handleOpenModal(item)}><BiSolidEdit /> </button>
                                                    <button data-toggle="tooltip" title="Eliminar" className='btn btn-danger' onClick={() => eliminarProducto(item._id)}><AiFillDelete /></button>
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

            {/* Backdrop */}
            <div className={`${openModal ? 'modal-backdrop fade show' : 'd-none'}`}></div>

            {/* Modal */}
            <div className={`modal fade ${openModal ? 'show d-block' : 'd-none'}`} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{(isEditing) ? "Agregar Medicamento" : "Editar Medicamento"}</h5>
                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group mb-2">
                                <label className="mb-2" htmlFor="name">Nombre</label>
                                <input type="text" value={form.name} name='name' className="form-control" onChange={handleChange} placeholder="Ingresa el nombre del medicamento" />
                            </div>
                            <div className="form-group mb-2 d-none">
                                <input type="text" name="type" className="form-control" value={"Medicamento"} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2" htmlFor="shelter">Refugio</label>
                                <select name="shelter" id="shelter" className="form-control" onChange={handleChange} value={form.shelter}>
                                    <option value="">-- Seleccione --</option>
                                    {refugios.map(refugio => (
                                        <option key={refugio._id} value={refugio._id}>{refugio.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2" htmlFor="quantity">Cantidad</label>
                                <input type="number" min="0" name="quantity" className="form-control" onChange={handleChange} value={form.quantity} placeholder="Especifica la cantidad" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            {isEditing ?
                                <button className="btn btn-outlined-primary" onClick={actualizarProducto}>Actualizar</button>
                                : <button className="btn btn-outlined-primary" onClick={agregarProducto}>Agregar</button>}

                            <button className="btn btn-danger" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GestionMedicamento;
