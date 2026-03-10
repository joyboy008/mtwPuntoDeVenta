import { useCallback } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import ListarData from "../../components/tables/ListarData";
import api from "../../utils/api";

function ListarUsarios() {
  const columnsUsers = [
    { label: "Nombre", field: "name" },
    { label: "Username", field: "username" },
    { label: "Caja", field: "cash_register" },
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
      <div>
        <ListarData
          title="Users"
          fetchFunction={fetchUsers}
          columns={columnsUsers}
          searchFields={["username", "name", "role"]}
          whatIs={"Users"}
        />
      </div>
    </DefaulLayout>
  );
}

export default ListarUsarios;
