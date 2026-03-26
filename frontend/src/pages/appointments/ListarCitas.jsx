import { useCallback } from "react";
import ListarData from "../../components/tables/ListarData";
import api from "../../utils/api";
import DefaultLayout from "../../components/DefaultLayout";
import Footer from "../../components/Footer";
import { Fragment } from "react";

function ListarCitas() {
  const fetchSAppointments = useCallback(async () => {
    try {
      const response = await api.listarDataEspecial("appointments", {
        status: ["agendada", "en_proceso"],
      });
      return response;
    } catch (err) {
      console.error("Error fetching appointments:", err);
      return { data: [] };
    }
  }, []);

  return (
    <Fragment>
      <DefaultLayout title="Citas">
        <ListarData
          title="Citas"
          fetchFunction={fetchSAppointments}
          searchFields={[
            "client_name",
            "client_phone",
            "scheduled_at",
            "reason",
          ]}
          whatIs={"Citas"}
        />
      </DefaultLayout>
      <Footer />
    </Fragment>
  );
}

export default ListarCitas;
