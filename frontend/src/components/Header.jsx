import { useState, useEffect } from "react";
import logo from "../assets/images/logo unias mila.png";
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
                <Link className="dropbtn succes" to="/appointment">
                  Citas
                </Link>
              ) : null}
              {authProvider.checkRoutePermissions("admin") ? (
                <Link className="dropbtn succes" to="/users">
                  Usuarios
                </Link>
              ) : // <Link to="/catalog"> Producto </Link>
              // <Link to="/new_user">Nuevo Usuario</Link>
              //  <Link to="/users">Listar Usuarios</Link>
              null}
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
              {/* // <Link to="/catalog"> Producto </Link> */}
              {/* // <Link to="/new_user">Nuevo Usuario</Link> */}
              {/* // <Link to="/users">Listar Usuarios</Link> */}
            </div>
          </nav>
        </header>
        <header className="blackHeader"></header>
      </section>
    </>
  );
}

export default Header;
