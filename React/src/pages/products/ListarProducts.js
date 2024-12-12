import { useState, useCallback } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import Spinner from "react-bootstrap/Spinner";
import api from "../../utils/api";
import ListarData from "../../components/tables/ListarData";

function ListarProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const title = "Productos";

  const columnsProductos = [
    { label: "Nombre", field: "name" },
    { label: "Precio", field: "price" },
    { label: "Descripcion", field: "description" },
    { label: "Categoria", field: "category" },
  ];
  const fetchProductos = useCallback(async () => {
    try {
      const response = await api.listarData("productos");
      return response;
    } catch (err) {
      console.error("Error fetching sales:", err);
      return { data: [] };
    }
  }, []);

  return (
    <DefaulLayout title={title}>
      {isLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <ListarData
          title="Productos"
          fetchFunction={fetchProductos}
          columns={columnsProductos}
          searchFields={["name", "price", "description", "category", "code"]}
          whatIs={"Productos"}
        />
      )}
    </DefaulLayout>
  );
}

export default ListarProducts;
