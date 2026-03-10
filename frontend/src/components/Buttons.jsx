import { NavLink } from "react-router-dom";
import authProvider from "../utils/AuthProvider";

function Buttons({ endpoint, data, whatIs, onAddProduct, onAddClient }) {
  const renderContent = () => {
    if (whatIs === "nuevoProducto") {
      return (
        <a className="dropbtn succes" onClick={() => onAddProduct(data, 1)}>
          Agregar
        </a>
      );
    } else if (whatIs === "nuevoCliente") {
      return (
        <a className="dropbtn succes" onClick={() => onAddClient(data)}>
          Seleccionar
        </a>
      );
    } else if (whatIs === "Ventas") {
      return (
        <>
          <NavLink className="dropbtn succes" to={`/sales/${data}`}>
            Detalles
          </NavLink>
          {authProvider.checkRoutePermissions("admin") ? (
            <NavLink className="dropbtn danger" to={`/sales/delete/${data}`}>
              Eliminar
            </NavLink>
          ) : null}
        </>
      );
    } else if (
      whatIs === "Productos" &&
      authProvider.checkRoutePermissions("admin")
    ) {
      return (
        <>
          <NavLink className="dropbtn succes" to={`/${endpoint}/${data}`}>
            Actualizar
          </NavLink>
          <NavLink
            className="dropbtn danger"
            to={`/${endpoint}/delete/${data}`}
          >
            Eliminar
          </NavLink>
        </>
      );
    } else if (whatIs === "Clientes") {
      return (
        <>
          <NavLink className="dropbtn succes" to={`/${endpoint}/${data}`}>
            Actualizar
          </NavLink>

          {authProvider.checkRoutePermissions("admin") ? (
            <NavLink
              className="dropbtn danger"
              to={`/${endpoint}/delete/${data}`}
            >
              Eliminar
            </NavLink>
          ) : null}
        </>
      );
    } else if (
      whatIs === "Users" &&
      authProvider.checkRoutePermissions("admin")
    ) {
      return (
        <>
          <NavLink className="dropbtn succes" to={`/${endpoint}/${data}`}>
            Actualizar
          </NavLink>
          <NavLink
            className="dropbtn danger"
            to={`/${endpoint}/delete/${data}`}
          >
            Eliminar
          </NavLink>
        </>
      );
    } else if (authProvider.checkRoutePermissions("admin")) {
      return (
        <>
          <NavLink className="dropbtn succes" to={`/${endpoint}/${data}`}>
            Actualizar
          </NavLink>
          <NavLink
            className="dropbtn danger"
            to={`/${endpoint}/delete/${data}`}
          >
            Eliminar
          </NavLink>
        </>
      );
    }
  };
  return <>{renderContent()}</>;
}

export default Buttons;
