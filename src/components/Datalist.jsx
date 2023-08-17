import React, { useState } from 'react';
import { apiRefugio } from '../components/apis/Endpoint';
import { TbTruckDelivery } from 'react-icons/tb';
import Swal from "sweetalert2";

function DataList({ data, listId, inputId }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentItemId, setCurrentItemId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [responsable, setResponsable] = useState("");

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
            const numericQuantity = parseInt(quantity, 10);
    
            // Busca si el ítem ya existe en la tabla
            const existingItemIndex = selectedItems.findIndex(item => item._id === currentItemId);
    
            // Si el ítem ya existe en la tabla
            if (existingItemIndex !== -1) {
                // Calcula la nueva cantidad total si se agregara la cantidad seleccionada al ítem existente
                const newTotalQuantity = selectedItems[existingItemIndex].selectedQuantity + numericQuantity;
    
                // Verifica si la nueva cantidad total supera el stock disponible
                if (newTotalQuantity > selectedItem.quantity) {
                    Swal.fire('Error', 'La cantidad total supera el stock disponible.', 'error');
                    return;
                }
    
                // Si no supera el stock, actualiza la cantidad del ítem existente
                const updatedItems = [...selectedItems];
                updatedItems[existingItemIndex].selectedQuantity = newTotalQuantity;
                setSelectedItems(updatedItems);
            } else {
                // Si el ítem no existe en la tabla, verifica si la cantidad seleccionada supera el stock disponible
                if (numericQuantity > selectedItem.quantity) {
                    Swal.fire('Error', 'La cantidad seleccionada supera el stock disponible.', 'error');
                    return;
                }
    
                // Si no supera el stock, agrega el ítem a la tabla
                setSelectedItems([...selectedItems, { ...selectedItem, selectedQuantity: numericQuantity }]);
            }
    
            updateStock(currentItemId, numericQuantity);
            setCurrentItemId('');
            setQuantity(1);
        }
    };
    

    const removeItemFromTable = (indexToRemove) => {
        const updatedItems = selectedItems.filter((_, index) => index !== indexToRemove);
        setSelectedItems(updatedItems);
    };


    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center justify-content-center w-100">
                <div className="form-group mb-3 mr-3 flex-grow-1">
                    <label htmlFor="form-label">Producto:</label>
                    <input
                        list={listId}
                        id={inputId}
                        onChange={handleSelection}
                        value={currentItemId}
                        className="form-control"
                        placeholder="Seleccione un item..."
                    />
                </div>
                <div className="form-group mb-3 mx-3 flex-grow-1">
                    <label htmlFor="form-label">Cantidad:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Cantidad"
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-3 mt-4 flex-grow-1">
                    <button
                        onClick={addItemToTable}
                        className="btn btn-primary w-100"
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
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems.map((selected, index) => (
                            <tr key={index}>
                                <td>{selected.name}</td>
                                <td>{selected.quantity}</td>
                                <td>{selected.selectedQuantity}</td>
                                <td>
                                    <span className="h3 text-danger" onClick={() => removeItemFromTable(index)}>&times;</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="d-flex m-3">
                <label htmlFor="responsable" className='mr-2 flex-grow-1'>Responsable </label>
                <input
                    type="text"
                    className='form-control form-input mx-2 flex-grow-1'
                    id="responsable"
                    name='responsable'
                    value={responsable}
                    onChange={e => setResponsable(e.target.value)}
                />
                <button
                    className='btn btn-primary mx-2 flex-grow-1'
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
