// Se utiliza para pagina no encontrada

import logo from "../assets/images/logo-mtw-header.png";
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
      </div>
    </div>
  );
};

export default Error;
