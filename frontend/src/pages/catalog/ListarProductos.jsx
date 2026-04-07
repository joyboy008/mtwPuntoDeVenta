import { useCallback } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import ListarData from "../../components/tables/ListarData";
import api from "../../utils/api";
import HeaderUsers from "../users/utils/HeaderUsers";

function ListarProductos() {
  const columnsUsers = [
    { label: "Nombre", field: "name" },
    { label: "Descripcion", field: "description" },
    { label: "Precio", field: "price" },
    { label: "Servicio", field: "category" },
  ];
  const fetchCatalog = useCallback(async () => {
    try {
      const response = await api.listarData("catalog");
      return response;
    } catch (err) {
      console.error("Error fetching sales:", err);
      return { data: [] };
    }
  }, []);

  return (
    <DefaulLayout title="Productos">
      <section className="sectionCrearCita">
        <HeaderUsers component="Crear Producto" />

        <div>
          <ListarData
            title="Productos"
            fetchFunction={fetchCatalog}
            searchFields={["name", "description", "price", "category"]}
          />
        </div>
      </section>
    </DefaulLayout>
  );
}

export default ListarProductos;
