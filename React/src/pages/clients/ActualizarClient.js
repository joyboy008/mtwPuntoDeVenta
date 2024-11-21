import { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useLoaderData, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import api from "../../utils/api";
import FormularioClient from "../../components/FormularioClient";

function ActualizarClient() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setClient(data);
      setLoading(false);
    }
  }, [data]);

  const handleChange = (event) => {
    const clientCopy = { ...client };
    clientCopy[event.target.name] = event.target.value;
    setClient(clientCopy);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .actualizarData("clientes", client, client.id)
      .then((response) => {
        Swal.fire({
          title: "Listo!!",
          text: "Cliente actualizado exitosamente",
          icon: "success",
          confirmButtonText: "Guardar",
        });
        navigate("/clientes");
      })
      .catch((err) => console.log(err));
  };

  return (
    <DefaultLayout title="Clientes">
      {loading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <FormularioClient
          title={"Actualizar Cliente"}
          esActualizacion={true}
          data={client}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </DefaultLayout>
  );
}

export default ActualizarClient;
