import { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useLoaderData, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import api from "../../utils/api";
import FormularioProduct from "../../components/FormularioProduct";

function ActualizarProduct() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setProduct(data);
      setLoading(false);
    }
  }, [data]);

  const handleChange = (event) => {
    const productCopy = { ...product };
    productCopy[event.target.name] = event.target.value;
    setProduct(productCopy);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .actualizarData("productos", product, product.id)
      .then((response) => {
        Swal.fire({
          title: "Listo!!",
          text: "Producto actualizado exitosamente",
          icon: "success",
          confirmButtonText: "Guardar",
        });
        navigate("/productos");
      })
      .catch((err) => console.log(err));
  };

  return (
    <DefaultLayout title="Productos">
      {loading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <FormularioProduct
          title={"Actualizar Producto"}
          esActualizacion={true}
          data={product}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </DefaultLayout>
  );
}

export default ActualizarProduct;
