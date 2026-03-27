import { useCallback } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import ListarData from "../../components/tables/ListarData";
import api from "../../utils/api";
import HeaderUsers from "./utils/HeaderUsers";

function ListarUsarios() {
  const columnsUsers = [
    { label: "Nombre", field: "name" },
    { label: "Username", field: "username" },
    { label: "Estado", field: "is_active" },
    { label: "Rol", field: "role" },
  ];
  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.listarData("users");
      return response;
    } catch (err) {
      console.error("Error fetching sales:", err);
      return { data: [] };
    }
  }, []);

  return (
    <DefaulLayout title="Usuarios">
      <section className="sectionCrearCita">
        <HeaderUsers component="Crear Producto" />

        <div>
          <ListarData
            title="Users"
            fetchFunction={fetchUsers}
            searchFields={["username", "name", "role"]}
          />
        </div>
      </section>
    </DefaulLayout>
  );
}

export default ListarUsarios;
