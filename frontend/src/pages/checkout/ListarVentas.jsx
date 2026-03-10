import { useCallback } from "react";
import ListarData from "../../components/tables/ListarData";
import api from "../../utils/api";
import DefaultLayout from "../../components/DefaultLayout";

function ListarVentas() {
  const columns = [
    { label: "Vendedor", field: "user_username" },
    { label: "Cliente", field: "client_name" },
    { label: "Total", field: "total" },
    { label: "Entrega", field: "client_address" },
    { label: "Fecha", field: "date" },
  ];

  const fetchSales = useCallback(async () => {
    try {
      const response = await api.listarData("sales");
      return response;
    } catch (err) {
      console.error("Error fetching sales:", err);
      return { data: [] };
    }
  }, []);

  return (
    <DefaultLayout title="Ventas">
      <ListarData
        title="Ventas"
        fetchFunction={fetchSales}
        columns={columns}
        searchFields={[
          "client_name",
          "user_username",
          "address",
          "total",
          "date",
        ]}
        whatIs={"Ventas"}
      />
    </DefaultLayout>
  );
}

export default ListarVentas;
