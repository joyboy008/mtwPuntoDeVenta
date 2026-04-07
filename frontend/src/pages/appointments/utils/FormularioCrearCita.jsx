import React from "react";
import "./styles.css";
import { services } from "../../../utils/constants";
import { Link } from "react-router-dom";

export function FormularioCrearCita({
  form,
  handleChange,
  handleSubmit,
  handleChangeDate,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="FormularioCita">
        <div>
          <input
            className="input-citas"
            type="text"
            name="client_name"
            placeholder="Nombre del cliente"
            value={form.client_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className="input-citas"
            type="text"
            name="client_phone"
            pattern="^[0-9]{8}$"
            placeholder="Celular del Cliente"
            value={form.client_phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className="input-citas"
            type="number"
            name="client_advance"
            placeholder="Anticipo"
            value={form.client_advance}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <select
            className="input-citas"
            name="reason"
            value={form.reason}
            onChange={handleChange}
          >
            <option value="">Servicio</option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            className="input-citas"
            type="datetime-local"
            name="scheduled_at"
            value={form.scheduled_at}
            onChange={handleChangeDate}
            required
          />
        </div>
        <div>
          <button className="dropbtn succes" type="submit">
            Guardar Cita
          </button>
          <Link className="dropbtn danger" to="/list-appointments">
            Regresar
          </Link>
        </div>
      </div>
    </form>
  );
}
export default FormularioCrearCita;
