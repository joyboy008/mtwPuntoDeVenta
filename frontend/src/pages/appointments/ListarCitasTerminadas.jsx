import { useCallback } from "react";
import ListarData from "../../components/tables/ListarData";
import api from "../../utils/api";
import DefaultLayout from "../../components/DefaultLayout";
import Footer from "../../components/Footer";
import { Fragment } from "react";
import HeaderCitas from "./utils/HeaderCitas";

function ListarCitasTerminadas() {
  const fetchSAppointments = useCallback(async () => {
    try {
      const response = await api.listarDataEspecial("appointments", {
        status: ["finalizada"],
      });
      return response;
    } catch (err) {
      console.error("Error fetching appointments:", err);
      return { data: [] };
    }
  }, []);

  return (
    <Fragment>
      <DefaultLayout title="Citas Finalizadas">
        <section className="sectionCrearCita">
          <HeaderCitas component="Terminadas" />
          <ListarData
            title="Citas"
            fetchFunction={fetchSAppointments}
            searchFields={[
              "client_name",
              "client_phone",
              "scheduled_at",
              "reason",
            ]}
            whatIs={"Citas_Terminadas"}
          />
        </section>
      </DefaultLayout>
      <Footer />
    </Fragment>
  );
}

export default ListarCitasTerminadas;
