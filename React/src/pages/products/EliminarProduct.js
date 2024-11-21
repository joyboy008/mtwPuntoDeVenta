import { useLoaderData, useNavigate } from "react-router-dom";
import DefaulLayout from "../../components/DefaultLayout";
import Swal from "sweetalert2";
import api from "../../utils/api";

function EliminarProduct() {
  const product = useLoaderData(); // Cargamos los datos del product a eliminar
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.desactivarData("productos", product.id);
      Swal.fire({
        title: "Producto eliminado con éxito!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/productos");
    } catch (error) {
      Swal.fire({
        title: "Error al eliminar el producto",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(error);
    }
  };

  return (
    <DefaulLayout title="Eliminar producto" size="slider-small">
      <section className="eliminated">
        <h2>
          ¿Estás seguro de eliminar a <code>{product.name}</code>?
        </h2>

        <div>
          <button className="dropbtn danger" onClick={handleDelete}>
            Confirmar eliminación
          </button>
          <button
            className="dropbtn succes"
            onClick={() => navigate("/productos")}
          >
            Cancelar
          </button>
        </div>
      </section>
    </DefaulLayout>
  );
}

export default EliminarProduct;
