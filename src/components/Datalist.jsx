import React, { useState } from 'react';
import { apiRefugio } from '../components/apis/Endpoint';
import { TbTruckDelivery } from 'react-icons/tb';
import Swal from "sweetalert2";

function DataList({ data, listId, inputId }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentItemId, setCurrentItemId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [responsable, setResponsable ] = useState("");

    const handleSelection = (e) => {
        setCurrentItemId(e.target.value);
    };

    const actualizarStock = (itemId, quantityToSubtract) => {
        const selectedItem = data.find(item => item._id === itemId);

        if (selectedItem) {
            // Actualizamos el stock localmente
            selectedItem.quantity -= quantityToSubtract;

            // Preparamos el formulario para enviar al servidor
            const updatedForm = {
                ...selectedItem,
                quantity: selectedItem.quantity
            };

            // Llamada al servidor para actualizar
            fetch(apiRefugio.url + apiRefugio.producto.editar_producto + itemId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedForm)
            })
                .then(res => res.json())
                .then(data => {
                    Swal.fire('Actualización Exitosa', data.mensaje, 'success');
                })
                .catch(error => {
                    Swal.fire('Error en la actualización', 'Ha ocurrido un error actualizando el producto.', 'error');
                });
        }
    }


    const addItemToTable = () => {
        const selectedItem = data.find(item => item._id === currentItemId);
        if (selectedItem) {
            setSelectedItems([...selectedItems, { ...selectedItem, selectedQuantity: quantity }]);
            updateStock(currentItemId, quantity);
            setCurrentItemId('');
            setQuantity(1);
        }
    };


    return (
        <div className="container mt-5">
            <div className="input-group mb-3">
                <input
                    list={listId}
                    id={inputId}
                    onChange={handleSelection}
                    value={currentItemId}
                    className="form-control"
                    placeholder="Seleccione un item..."
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Cantidad"
                    className="form-control"
                />
                <div className="input-group-append">
                    <button
                        onClick={addItemToTable}
                        className="btn btn-primary"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            <datalist id={listId}>
                {data.map(item => (
                    <option key={item._id} value={item._id}>
                        <strong>{item.name}</strong> - Stock: {item.quantity} - <small>ID: {item._id}</small>
                    </option>


                ))}
            </datalist>

            {selectedItems.length > 0 && (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Cantidad Seleccionada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems.map((selected, index) => (
                            <tr key={index}>
                                <td>{selected.name}</td>
                                <td>{selected.quantity}</td>
                                <td>{selected.selectedQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="d-flex m-3">
                <label htmlFor="responsable" className='mr-2'>Responsable </label>
                <input
                    type="text"
                    className='form-control form-input mx-2'
                    id="responsable"
                    name='responsable'
                    value={responsable}
                    onChange={e => setResponsable(e.target.value)}
                />
                <button
                    className='btn btn-primary mx-2 w-25'
                    onClick={() => {
                        selectedItems.forEach(item => {
                            actualizarStock(item._id, item.selectedQuantity);
                        });
                        setSelectedItems([]); // Limpiamos la tabla una vez realizada la entrega
                    }}
                >
                    <TbTruckDelivery /> Realizar Entrega
                </button>
            </div>
        </div>
    );
}

export default DataList;
