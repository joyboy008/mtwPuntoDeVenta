import { useLoaderData, useNavigate } from "react-router-dom";
import DefaulLayout from "../../components/DefaultLayout";
import Swal from "sweetalert2";
import api from "../../utils/api";

function EliminarVenta() {
  const sale = useLoaderData();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await api.eliminarData("sales", sale.id);
      Swal.fire({
        title: "Venta eliminada con éxito!",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      navigate("/sales");
    } catch (error) {
      Swal.fire({
        title: "Error al eliminar la venta",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(error);
    }
  };

  return (
    <DefaulLayout title="Eliminar Venta" size="slider-small">
      <section className="center">
        <h2>
          ¿Estás seguro de que deseas eliminar la venta a{" "}
          <code>{sale.client_name}</code> por <code>{sale.total}</code>{" "}
          Quetzales
        </h2>
        <button onClick={handleDelete}>Confirmar eliminación</button>
        <button onClick={() => navigate("/sales")}>Cancelar</button>
      </section>
    </DefaulLayout>
  );
}

export default EliminarVenta;
