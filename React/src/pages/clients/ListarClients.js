import { useCallback } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import api from "../../utils/api";
import ListarData from "../../components/tables/ListarData";

function ListarClients() {
  const columns = [
    { label: "Nombre", field: "name" },
    { label: "Teléfono", field: "phone" },
    { label: "Entrega", field: "address" },
  ];
  const fetchClientes = useCallback(async () => {
    try {
      const response = await api.listarData("clientes");
      return response;
    } catch (err) {
      console.error("Error fetching sales:", err);
      return { data: [] };
    }
  }, []);
  return (
    <DefaulLayout title="Clientes">
      <div className="">
        <ListarData
          title="Clientes"
          fetchFunction={fetchClientes}
          columns={columns}
          searchFields={["name", "phone", "address"]}
          whatIs={"Clientes"}
        />
      </div>
    </DefaulLayout>
  );
}

export default ListarClients;
