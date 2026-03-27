import React from "react";
import { services, STATUS_TRANSITIONS } from "../../../utils/constants";

export function FormularioEditarCita({
  form,
  cita,
  handleChange,
  handleSaveForm,
  isCitaEditable,
  saving,
  handleStatusChange,
}) {
  return (
    <div>
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
          {services.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
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
          <br />
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
    </div>
  );
}

export default FormularioEditarCita;
