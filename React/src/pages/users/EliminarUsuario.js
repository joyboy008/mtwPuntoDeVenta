import { useLoaderData, useNavigate } from "react-router-dom";
import DefaulLayout from "../../components/DefaultLayout";
import Swal from "sweetalert2";
import api from "../../utils/api";

function EliminarUsuario() {
  const usuario = useLoaderData(); // Cargamos los datos del usuario a eliminar
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await api.desactivarData("users", usuario.id);
      Swal.fire({
        title: "Usuario eliminado con éxito!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/users"); // Redirige a la lista de usuarios después de eliminar
    } catch (error) {
      Swal.fire({
        title: "Error al eliminar el usuario",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(error);
    }
  };

  return (
    <DefaulLayout title="Eliminar usuario" size="slider-small">
      <section className="eliminated">
        <h2>
          ¿Estás seguro de eliminar a <code>{usuario.username}</code>?
        </h2>
        <div>
          <button className="dropbtn danger" onClick={handleDelete}>
            Confirmar eliminación
          </button>
          <button className="dropbtn succes" onClick={() => navigate("/users")}>
            Cancelar
          </button>
        </div>
      </section>
    </DefaulLayout>
  );
}

export default EliminarUsuario;
