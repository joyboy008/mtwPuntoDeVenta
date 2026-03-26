// Se utiliza para pagina no encontrada

import logo from "../../assets/images/logo unias mila.png";
import "./error-styles.css";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div id="content" className="notFound">
      <NavLink className="dropbtn" to="/">
        <img className="logo-line" src={logo} alt="Logotipo" />
      </NavLink>
      <div className="notFoundMessage">
        <h1 className="subheader">Página no encontrada.</h1>
        <p>La página a la que intentas acceder no existe en nuestra red.</p>
        <NavLink className="dropbtn" to="/">
          Regresar
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
