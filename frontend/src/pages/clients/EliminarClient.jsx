import { useLoaderData, useNavigate } from "react-router-dom";
import DefaulLayout from "../../components/DefaultLayout";
import Swal from "sweetalert2";
import api from "../../utils/api";

function EliminarClient() {
  const client = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.desactivarData("clientes", client.id);
      Swal.fire({
        title: "Cliente eliminado con éxito!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/clientes");
    } catch (error) {
      Swal.fire({
        title: "Error al eliminar el cliente",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(error);
    }
  };

  return (
    <DefaulLayout title="Eliminar Cliente" size="slider-small">
      <section className="eliminated">
        <h2>
          ¿Estás seguro de que deseas eliminar a <code>{client.name}</code>?
        </h2>
        <div>
          <button className="dropbtn danger" onClick={handleDelete}>
            Confirmar eliminación
          </button>
          <button
            className="dropbtn succes"
            onClick={() => navigate("/clientes")}
          >
            Cancelar
          </button>
        </div>
      </section>
    </DefaulLayout>
  );
}

export default EliminarClient;
