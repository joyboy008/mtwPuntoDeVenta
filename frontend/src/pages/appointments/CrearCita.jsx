import { useEffect, useState } from "react";
import api from "../../utils/api";
import DefaultLayout from "../../components/DefaultLayout";
import "./utils/styles.css";
import Swal from "sweetalert2";
import FormularioCrearCita from "./utils/FormularioCrearCita";
import LabelCitas from "./utils/LabelCitas";
import HeaderCitas from "./utils/HeaderCitas";

function CrearCita() {
  const initialForm = {
    client_name: "",
    client_phone: "",
    client_advance: "",
    reason: "",
    scheduled_at: "",
  };
  const [form, setForm] = useState(initialForm);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsSaved, setAppointmentsSaved] = useState([]);

  useEffect(() => {
    api
      .listarData("appointments")
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeDate = (e) => {
    const { name, value } = e.target;
    const dateOnly = value.split("T")[0];

    api
      .getCitasPorFecha(dateOnly)
      .then((res) => {
        console.log(res);
        setAppointmentsSaved(res.data);
      })
      .catch((err) => console.log(err));

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...form,
      scheduled_at: new Date(form.scheduled_at).toISOString(),
    };
    api
      .crearData("appointments", dataToSend)
      .then((response) => {
        Swal.fire({
          title: "Cita creada con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setForm(initialForm);
      })
      .catch((err) => console.log(err));
  };

  return (
    <DefaultLayout title="Crear Cita">
      <section className="sectionCrearCita">
        <HeaderCitas component="Crear Cita" />
        <FormularioCrearCita
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleChangeDate={handleChangeDate}
        />
        {appointmentsSaved.length > 0 ? (
          <LabelCitas appointmentsSaved={appointmentsSaved} />
        ) : (
          <div className="div-label-cita">
            <div className="out-label-cita">
              <span className="lable">
                Modifica la Fecha para verificar si hay citas.
              </span>
            </div>
          </div>
        )}

        {/* Agregar Un formulario que traiga las citas del dia seleccionado */}
      </section>
    </DefaultLayout>
  );
}

export default CrearCita;
