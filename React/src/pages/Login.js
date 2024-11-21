import { useEffect, useState } from "react";
import DefaulLayout from "../components/DefaultLayout";
import authProvider from "../utils/AuthProvider";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import Alert from "react-bootstrap/Alert";
import logo from "../assets/images/logo-mtw.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };
    api
      .login(data)
      .then((response) => {
        const session = {
          user: {
            _id: response.data.id,
            username: response.data.username,
            role: response.data.role,
          },
          token: response.data.token,
        };
        authProvider.saveSession(session);
        navigate("/checkout");
      })
      .catch((err) => {
        setShowValidationAlert(true);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "enter") {
      const form = document.querySelector("#login-form");
      if (form) {
        form.submit();
      }
    }
  };
  useEffect(() => {
    if (authProvider.checkAuth()) {
      navigate("/checkout");
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <DefaulLayout title="Login">
      <div id="center-body">
        <form id="login-form" className="wrapper" onSubmit={handleSubmit}>
          <img className="logo-line" src={logo} alt="Logotipo" />
          <div className="input-box">
            <input
              onChange={handleChange}
              value={username}
              type="text"
              autoComplete="off"
              name="username"
              className="FaUserDoctor"
              // pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
              placeholder="username"
              onFocus={() => {
                if (showValidationAlert) {
                  setShowValidationAlert(false);
                }
              }}
              required
            />
            <FaUserDoctor className="i" />
          </div>
          <div className="input-box">
            <input
              onChange={handleChange}
              value={password}
              type="password"
              name="password"
              placeholder="password"
              onFocus={() => {
                if (showValidationAlert) {
                  setShowValidationAlert(false);
                }
              }}
              required
            />
            <RiLockPasswordLine className="i" />
          </div>
          <input type="submit" value="Confirmar" className="boton" />
          <div className={`pt-4 ${showValidationAlert ? "" : "hidden"}`}>
            <Alert key="password-warning" variant="danger">
              Usuario o Password Incorrecto
            </Alert>
          </div>
        </form>
      </div>
    </DefaulLayout>
  );
}
export default Login;
