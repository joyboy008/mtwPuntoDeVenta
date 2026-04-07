import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export function HeaderUsers(component) {
  const OPTIONS = [
    { value: "/catalog", label: "Crear Producto" },
    { value: "/list-catalog", label: "Productos" },
    { value: "/users", label: "Usuarios" },
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

export default HeaderUsers;
