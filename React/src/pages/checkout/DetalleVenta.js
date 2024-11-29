import { useEffect, useState } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import { useLoaderData } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import FormularioVenta from "../../components/FormularioVenta";
import api from "../../utils/api";

function DetalleVenta() {
  const data = useLoaderData();
  const [ventaData, setVentaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setVentaData(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <DefaulLayout title="Ventas" size="slider-small">
      {loading ? (
        <div>
          <Spinner animation="grow" variant="info" />
          <h1>cargando...</h1>
        </div>
      ) : (
        <FormularioVenta title={"Detalle de Venta"} data={ventaData} />
      )}
    </DefaulLayout>
  );
}

export default DetalleVenta;
