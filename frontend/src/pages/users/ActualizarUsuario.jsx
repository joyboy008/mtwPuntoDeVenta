import { useEffect, useState } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import { useLoaderData, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import FormularioEditarUsuario from "./utils/FormularioEditarUsuario";

function ActualizarUsuario() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [usuarioData, setUsuarioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setUsuarioData(data);
      setLoading(false);
    }
  }, [data]);

  const handleChange = (event) => {
    const usuarioCopy = { ...usuarioData };
    usuarioCopy[event.target.name] = event.target.value;
    setUsuarioData(usuarioCopy);
  };
  const handleSubmit = () => {
    setLoading(true);
    api
      .actualizarData("users", usuarioData.id, usuarioData)
      .then((response) => {
        setLoading(false);
        Swal.fire({
          title: "Usuario modificado con éxito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <DefaulLayout title="Usuarios" size="slider-small">
      {loading ? (
        <div>
          <Spinner animation="grow" variant="info" />
          <h1>cargando...</h1>
        </div>
      ) : (
        <FormularioEditarUsuario
          form={usuarioData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      )}

      <br />
      {/* <TablaPacientes /> */}
    </DefaulLayout>
  );
}

export default ActualizarUsuario;
