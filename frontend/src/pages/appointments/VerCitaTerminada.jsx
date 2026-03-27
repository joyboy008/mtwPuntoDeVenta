import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import DefaultLayout from "../../components/DefaultLayout";
import QuotationPanel from "../../components/quotation/QuotationPanel";
import Swal from "sweetalert2";
import "./utils/styles.css";
import { services } from "../../utils/constants";
import HeaderCitas from "./utils/HeaderCitas";

const STATUSES_ALLOWED_FOR_QUOTATION = ["agendada", "en_proceso"];

const STATUS_TRANSITIONS = {
  agendada: [
    { value: "en_proceso", label: "Iniciar atención" },
    { value: "cancelada", label: "Cancelar cita" },
  ],
  en_proceso: [{ value: "finalizada", label: "Finalizar cita" }],
  finalizada: [],
  cancelada: [],
};

const STATUS_LABELS = {
  agendada: "Agendada",
  en_proceso: "En proceso",
  finalizada: "Finalizada",
  cancelada: "Cancelada",
};

const STATUS_COLORS = {
  agendada: "status-agendada",
  en_proceso: "status-en-proceso",
  finalizada: "status-finalizada",
  cancelada: "status-cancelada",
};

function VerCitaTerminada() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cita, setCita] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .getData("appointments", id)
      .then((res) => {
        setCita(res.data);
        setForm({
          client_name: res.data.client_name,
          client_phone: res.data.client_phone,
          client_advance: res.data.client_advance,
          reason: res.data.reason,
          scheduled_at: res.data.scheduled_at.slice(0, 16),
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Cita no encontrada",
          confirmButtonText: "Volver",
        }).then(() => navigate("/appointments"));
      })
      .finally(() => setLoading(false));
  }, [id]);

  const isCitaEditable =
    cita && cita.status !== "finalizada" && cita.status !== "cancelada";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await api.actualizarData("appointments", id, {
        ...form,
        scheduled_at: new Date(form.scheduled_at).toISOString(),
      });
      setCita(res.data);
      Swal.fire({
        icon: "success",
        title: "Cita actualizada",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: err.response?.data?.detail || "Intenta de nuevo",
        confirmButtonText: "Ok",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    const confirm = await Swal.fire({
      icon: "question",
      title: "¿Cambiar estado?",
      text: `La cita pasará a: ${STATUS_LABELS[newStatus]}`,
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await api.cambiarStatusCita(id, newStatus);
      setCita(res.data);
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al cambiar estado",
        text: err.response?.data?.detail || "Intenta de nuevo",
        confirmButtonText: "Ok",
      });
    }
  };

  if (loading)
    return (
      <DefaultLayout title="Cita">
        <p className="cita-loading">Cargando...</p>
      </DefaultLayout>
    );

  return (
    <DefaultLayout title="Detalle de Cita">
      <section className="sectionCrearCita">
        <HeaderCitas component="Terminadas" />
        {/* Header con nombre y estado */}
        <div className="cita-header">
          <span className={`status-badge ${STATUS_COLORS[cita.status]}`}>
            {STATUS_LABELS[cita.status]}
          </span>
        </div>

        {/* Formulario de datos */}
        <form className="FormularioCita" onSubmit={handleSaveForm}>
          <input
            className="input-citas"
            type="text"
            name="client_name"
            placeholder="Nombre del cliente"
            value={form.client_name}
            onChange={handleChange}
            disabled={!isCitaEditable}
            required
          />

          <input
            className="input-citas"
            type="text"
            name="client_phone"
            pattern="^[0-9]{8}$"
            placeholder="Celular del cliente"
            value={form.client_phone}
            onChange={handleChange}
            disabled={!isCitaEditable}
            required
          />

          <input
            className="input-citas"
            type="number"
            name="client_advance"
            placeholder="Anticipo"
            value={form.client_advance}
            onChange={handleChange}
            disabled={!isCitaEditable}
            required
          />

          <select
            className="input-citas"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            disabled={!isCitaEditable}
          >
            <option value="">Servicio</option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <input
            className="input-citas"
            type="datetime-local"
            name="scheduled_at"
            value={form.scheduled_at}
            onChange={handleChange}
            disabled={!isCitaEditable}
            required
          />

          {isCitaEditable && (
            <button className="dropbtn succes" type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          )}
        </form>

        {/* Botones de cambio de estado */}
        {STATUS_TRANSITIONS[cita.status]?.length > 0 && (
          <div className="status-actions">
            {STATUS_TRANSITIONS[cita.status].map((transition) => (
              <button
                key={transition.value}
                className={`dropbtn ${transition.value === "cancelada" ? "danger" : "succes"}`}
                onClick={() => handleStatusChange(transition.value)}
                type="button"
              >
                {transition.label}
              </button>
            ))}
          </div>
        )}

        {/* Panel de cotización — solo si la cita lo permite */}
        {/* {STATUSES_ALLOWED_FOR_QUOTATION.includes(cita.status) && ( */}
        <div className="quotation-section">
          <QuotationPanel appointmentId={Number(id)} />
        </div>
        {/* )} */}
        {/* Cotización en modo lectura si está finalizada */}
        {cita.status === "finalizada" && cita.quotation && (
          <div className="quotation-readonly">
            <h3 className="quotation-title">Cotización final</h3>
            {cita.quotation.items?.map((item, i) => (
              <div key={i} className="quotation-item">
                <div className="quotation-item-info">
                  <span className="quotation-item-category">
                    {item.category}
                  </span>
                  <span className="quotation-item-name">{item.name}</span>
                  {item.description && (
                    <span className="quotation-item-desc">
                      {item.description}
                    </span>
                  )}
                </div>
                <span className="quotation-item-price">
                  Q{Number(item.price).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="quotation-total">
              <span>Total</span>
              <span>Q{Number(cita.quotation.total).toFixed(2)}</span>
            </div>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}

export default VerCitaTerminada;
