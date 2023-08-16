export const ENDPOINT = "http://127.0.0.1:8000";
export const apiRefugio = {
  url: "http://127.0.0.1:3000/",
  producto: {
    nuevo_producto: "products/create",
    editar_producto: "products/",
    eliminar_producto: "products/",
    listar_producto: "products/all",
    obtener_producto_por_id: "products/",
    obtener_producto_por_nombre: "/obtener_producto_por_nombre"
  },
  refugio: {
    nuevo_refugio: "shelters/create",
    eliminar_producto: "shelters/",
    editar_refugio: "shelters/",
    listar_refugio: "shelters/all",
    obtener_producto_por_id: "shelters/",
  },
  transaccion: {
    crear_transaccion: "/crear_transaccion",
    editar_transaccion: "/editar_transaccion",
    listar_transaccion: "/listar_transaccion"
  }
};