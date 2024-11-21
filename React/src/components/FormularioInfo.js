// Se utiliza en Home
// Se utiliza en Contacto

import { useState } from "react";
import api from "../utils/api";
import Swal from "sweetalert2";

const FormularioInfo = ({ title }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a tu backend
    try {
      api.crearData("contact", formData).then((response) => {
        Swal.fire({
          title: "Pronto estaremos en contacto contigo!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-container">
      <h3>{title}</h3>
      <form className="formInfo" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
          value={formData.name}
          onChange={handleChange}
          autoComplete="none"
          title="Ej. Josue Alejandro Morales Castillo"
          placeholder="Ingrese su nombre"
          required
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="none"
          pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
          title="Ej. Josue@gmail.com"
          placeholder="Ingrese su correo electrónico"
          required
        />

        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="En qué tipo de software está interesado?"
          required
        ></textarea>

        <button type="submit" className="infoBtn">
          Solicitar Información
        </button>
      </form>
    </div>
  );
};

export default FormularioInfo;
