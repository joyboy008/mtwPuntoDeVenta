import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import DefaultLayout from "../../components/DefaultLayout";
import QuotationPanel from "../../components/quotation/QuotationPanel";
import Swal from "sweetalert2";
import "./utils/styles.css";
import {
  STATUSES_ALLOWED_FOR_QUOTATION,
  STATUS_LABELS,
  STATUS_COLORS,
} from "../../utils/constants";
import FormularioEditarCita from "./utils/FormularioEditarCita";

function EditarCita() {
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
      <section className="editar-cita-container">
        {/* Header con nombre y estado */}
        <div className="cita-header">
          <span className={`status-badge ${STATUS_COLORS[cita.status]}`}>
            {STATUS_LABELS[cita.status]}
          </span>
        </div>

        {/* Formulario de datos */}
        <FormularioEditarCita
          form={form}
          cita={cita}
          handleSaveForm={handleSaveForm}
          isCitaEditable={isCitaEditable}
          saving={saving}
          handleChange={handleChange}
          handleStatusChange={handleStatusChange}
        />

        {/* aquii debe de aparecer el componente de citas agendadas */}

        {/* Panel de cotización — solo si la cita lo permite */}
        {STATUSES_ALLOWED_FOR_QUOTATION.includes(cita.status) && (
          <div className="quotation-section">
            <QuotationPanel appointmentId={Number(id)} />
          </div>
        )}

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

export default EditarCita;
