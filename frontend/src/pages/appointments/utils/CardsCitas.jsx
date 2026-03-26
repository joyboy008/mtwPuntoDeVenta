import React from "react";
import authProvider from "../../../utils/AuthProvider";
import { FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./styles.css";

export const CardsCitas = ({ cita, whatIs }) => {
  const formatDateTime = (value) => {
    const date = new Date(value);

    const hora = date.toLocaleTimeString("es-GT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const fecha = date.toLocaleDateString("es-GT", {
      day: "2-digit",
      month: "short",
    });

    return `${hora} ${fecha}`;
  };
  return (
    <div className="card">
      <div className="content">
        <span className="title">{cita.client_name}</span>

        <div className="desc">
          📌 Servicio: {cita.reason} <br />
          💵 Anticipo: Q{cita.client_advance} <br />
          📅 {formatDateTime(cita.scheduled_at)}
        </div>
        <div>
          <br />
          {whatIs === "Citas_Terminadas" ? (
            <NavLink
              className="dropbtn succes"
              to={`/appointment-end/${cita.id}`}
            >
              Detalles
            </NavLink>
          ) : (
            <NavLink className="dropbtn succes" to={`/appointment/${cita.id}`}>
              Detalles
            </NavLink>
          )}
          {authProvider.checkRoutePermissions("admin") ? (
            <NavLink
              className="dropbtn danger"
              to={`/appointments/delete/${cita.id}`}
            >
              Eliminar
            </NavLink>
          ) : null}
        </div>
      </div>
      <a
        href={`https://wa.me/502${cita.client_phone}`}
        target="_blank"
        rel="noreferrer"
        className="close"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default CardsCitas;
