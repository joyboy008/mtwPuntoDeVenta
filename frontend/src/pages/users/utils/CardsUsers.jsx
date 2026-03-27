import React from "react";
import authProvider from "../../../utils/AuthProvider";
import { FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./styles.css";
import Swal from "sweetalert2";
import api from "../../../utils/api";

export const CardsUsers = ({ user }) => {
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
  const handleStatusChange = async (id, newStatus) => {
    const confirm = await Swal.fire({
      icon: "question",
      title: "¿Cambiar estado?",
      text: `La cita se cancelará`,
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    try {
      const res = await api.cambiarStatusCita(id, newStatus);
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

  return (
    <div className="card-user">
      <div className="content-user">
        <div>
          <span className="title">{user.name}</span>
        </div>

        <div className="desc">
          💻Username: {user.username} <br />
          👩‍🦰Role: {user.role} <br />
          🫥Status: {user.is_active ? "Activo" : "Inactivo"}
        </div>
        <div>
          <NavLink className="dropbtn succes" to={`/users/${user.id}`}>
            Editar
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CardsUsers;
