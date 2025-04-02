import { useState, useEffect } from "react";
import logo from "../assets/images/logo-mtw-header.png";
import { Link, useNavigate } from "react-router-dom";
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
    if (activeUser !== user) {
      setUser(activeUser);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleCloseSession = () => {
    authProvider.deleteSession();
    navigate("/", { replace: true });
  };

  return (
    <>
      <section>
        <header
          className={`header ${scrollDirection === "down" ? "hide" : ""}`}
        >
          <nav>
            <div className="title">
              <Link to="/">
                <img className="logo-line" src={logo} alt="Logotipo" />
              </Link>
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
                    <Link to="/checkout">Realizar venta</Link>
                    <Link to="/sales">Listar Ventas</Link>
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
                      <Link to="/new_product">Nuevo Producto</Link>
                    ) : null}
                    <Link to="/productos">Listar Productos</Link>
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
                    <Link to="/new_client">Nuevo Cliente</Link>
                    <Link to="/clientes">Listar Clientes</Link>
                  </div>
                </div>
              ) : null}
              {authProvider.checkRoutePermissions("admin") ? (
                <div className="dropdown">
                  <input type="checkbox" id="dropdown-toggle-usuarios" />
                  <label
                    className="dropbtn headermin"
                    htmlFor="dropdown-toggle-usuarios"
                  >
                    Usuarios
                  </label>
                  <div className="dropdown-content">
                    <Link to="/new_user">Nuevo Usuario</Link>
                    <Link to="/users">Listar Usuarios</Link>
                  </div>
                </div>
              ) : null}
              {!!authProvider.checkAuth() ? (
                <div className="dropdown">
                  <button
                    className="dropbtn danger headermin"
                    onClick={handleCloseSession}
                  >
                    {user ? <span>{user.username}</span> : <span>Login</span>}
                  </button>
                </div>
              ) : (
                <Link className="dropbtn succes" to="/login">
                  Login
                </Link>
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
