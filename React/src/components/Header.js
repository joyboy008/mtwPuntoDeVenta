import { useState, useEffect } from "react";
import logo from "../assets/images/logo-mtw-header.png";
import { NavLink, useNavigate } from "react-router-dom";
import authProvider from "../utils/AuthProvider";

function Header() {
  const navigate = useNavigate();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    const activeUser = authProvider.getUsuario();
    setUser(activeUser);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleCloseSession = () => {
    authProvider.deleteSession();
    navigate("/");
  };

  return (
    <>
      <section>
        <header
          className={`header ${scrollDirection === "down" ? "hide" : ""}`}
        >
          <nav>
            <div className="title">
              <NavLink to="/">
                <img className="logo-line" src={logo} alt="Logotipo" />
              </NavLink>
            </div>
            <div className="menu">
              {authProvider.checkRoutePermissions("moderador") ? (
                <div className="dropdown">
                  <input type="checkbox" id="dropdown-toggle-sales" />
                  <label
                    className="dropbtn headermin"
                    htmlFor="dropdown-toggle-sales"
                  >
                    Ventas
                  </label>

                  <div className="dropdown-content">
                    <NavLink to="/checkout">Realizar venta</NavLink>
                    <NavLink to="/sales">Listar Ventas</NavLink>
                  </div>
                </div>
              ) : null}
              {authProvider.checkRoutePermissions("moderador") ? (
                <div className="dropdown">
                  <input type="checkbox" id="dropdown-toggle-products" />
                  <label
                    className="dropbtn headermin"
                    htmlFor="dropdown-toggle-products"
                  >
                    Productos
                  </label>
                  <div className="dropdown-content">
                    {authProvider.checkRoutePermissions("admin") ? (
                      <NavLink to="/new_product">Nuevo Producto</NavLink>
                    ) : null}
                    <NavLink to="/productos">Listar Productos</NavLink>
                  </div>
                </div>
              ) : null}
              {authProvider.checkRoutePermissions("moderador") ? (
                <div className="dropdown">
                  <input type="checkbox" id="dropdown-toggle-pacientes" />
                  <label
                    className="dropbtn headermin"
                    htmlFor="dropdown-toggle-pacientes"
                  >
                    Clientes
                  </label>
                  <div className="dropdown-content">
                    <NavLink to="/new_client">Nuevo Cliente</NavLink>
                    <NavLink to="/clientes">Listar Clientes</NavLink>
                  </div>
                </div>
              ) : null}
              {authProvider.checkRoutePermissions("admin") ? (
                <div className="dropdown">
                  <input type="checkbox" id="dropdown-toggle-usuarios" />
                  <label className="dropbtn" htmlFor="dropdown-toggle-usuarios">
                    Usuarios
                  </label>
                  <div className="dropdown-content">
                    <NavLink to="/new_user">Nuevo Usuario</NavLink>
                    <NavLink to="/users">Listar Usuarios</NavLink>
                  </div>
                </div>
              ) : null}
              {!!authProvider.checkAuth() ? (
                <div className="dropdown">
                  <label
                    className="dropbtn danger headermin"
                    onClick={handleCloseSession}
                  >
                    {user ? <span>{user.username}</span> : <span>Login</span>}
                  </label>
                </div>
              ) : (
                <NavLink className="dropbtn succes" to="/login">
                  Login
                </NavLink>
              )}
            </div>
          </nav>
        </header>
        <header className="blackHeader"></header>
      </section>
    </>
  );
}

export default Header;
