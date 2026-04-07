import { useEffect, useState } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import { useLoaderData, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import FormularioEditarProducto from "./utils/FormularioEditarProducto";
import HeaderUsers from "../users/utils/HeaderUsers";

function ActualizarProducto() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [productData, setUsuarioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setUsuarioData(data);
      setLoading(false);
    }
  }, [data]);

  const handleChange = (event) => {
    const productCopy = { ...productData };
    productCopy[event.target.name] = event.target.value;
    setUsuarioData(productCopy);
  };
  const handleSubmit = () => {
    setLoading(true);
    api
      .actualizarData("catalog", productData.id, productData)
      .then((response) => {
        setLoading(false);
        Swal.fire({
          title: "Producto modificado con éxito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate("/list-catalog");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <DefaulLayout title="Productos" size="slider-small">
      <section className="sectionCrearCita">
        <HeaderUsers component="Crear Producto" />
        {loading ? (
          <div>
            <Spinner animation="grow" variant="info" />
            <h1>cargando...</h1>
          </div>
        ) : (
          <FormularioEditarProducto
            form={productData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        )}

        <br />
      </section>
    </DefaulLayout>
  );
}

export default ActualizarProducto;
