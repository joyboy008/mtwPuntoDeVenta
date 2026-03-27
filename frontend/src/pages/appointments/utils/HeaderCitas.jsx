import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export function HeaderCitas(component) {
  const OPTIONS = [
    { value: "/appointment", label: "Crear Cita" },
    { value: "/list-appointments", label: "Agendadas" },
    { value: "/list-appointments-end", label: "Terminadas" },
  ];
  return (
    <div>
      <div className="quotation-categories">
        {OPTIONS.map((opciones) => (
          <Link
            key={opciones.value}
            className={`cat-pill ${component === opciones.label ? "cat-pill--active" : ""}`}
            to={opciones.value}
          >
            {opciones.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeaderCitas;
