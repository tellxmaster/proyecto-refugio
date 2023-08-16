import React, { useEffect, useState } from 'react';
import { apiRefugio } from '../components/apis/Endpoint';

const Inicio = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [alertas, setAlertas] = useState([]);
    const [numAlertaMedicamento, setNumAlertaMedicamento] = useState(0);
    const [numAlertaAlimentos, setNumAlertaAlimentos] = useState(0);
    const [valorMinimo] = useState(100);
    const [productos, setProductos] = useState([]);

    const getAllProductos = () => {
        fetch(apiRefugio.url + apiRefugio.producto.listar_producto, {
            method: "GET"
        })
        .then(res => res.json())
        .then(res => {
            setProductos(res);
            console.log(res);
        });
    }

    const populateAlertasProductos = (items) => {
        let tempAlertas = [];
        let tempNumAlertaAlimento = 0;
        let tempNumAlertaMedicamento = 0;

        items.forEach(item => {
            if (item.quantity < valorMinimo) {
                tempAlertas.push(item);
                if (item.type === "Alimento") {
                    tempNumAlertaAlimento++;
                } else {
                    tempNumAlertaMedicamento++;
                }
            }
        });

        setAlertas(tempAlertas);
        setNumAlertaAlimentos(tempNumAlertaAlimento);
        setNumAlertaMedicamento(tempNumAlertaMedicamento);
    }

    useEffect(() => {
        getAllProductos();
        populateAlertasProductos(productos);
    }, [productos, valorMinimo]);

    return (
        <>
            <div className="container h-100 w-100">
                <h2 className="display-4 text-center mb-4">Inicio</h2>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <h4>Alertas Alimentos</h4>
                                    <hr />
                                <h5 className="card-title">{numAlertaAlimentos}</h5>
                                <p className="card-text">Número total de alertas para alimentos que están por debajo del umbral.</p>
                                <a href="/ruta-a-detalles-alimentos" className="btn btn-light text-primary">Ver más</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="card bg-success text-white">
                            <div className="card-body">
                                <h4>Alertas Medicamentos</h4>
                                <hr />
                                <h5 className="card-title">{numAlertaMedicamento}</h5>
                                <p className="card-text">Número total de alertas para medicamentos que están por debajo del umbral.</p>
                                <a href="/ruta-a-detalles-medicamentos" className="btn btn-light text-primary">Ver más</a>
                            </div>
                        </div>
                    </div>
                </div>

                {alertas.length ? (
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
                                {alertas.map(item => (
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
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
                    <div className="text-center">
                        <h2>No hay alertas</h2>
                        <p>Por el momento no hay alertas del inventario, se mostrará cuando el inventario haya alcanzado un nivel mínimo</p>
                    </div>
                )}
            </div>
        </>
    );

}

export default Inicio;
