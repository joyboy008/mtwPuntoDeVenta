import React from "react";
import { services } from "../../../utils/constants";
import { Link } from "react-router-dom";

export function FormularioEditarProducto({ form, handleSubmit, handleChange }) {
  return (
    <div>
      <form className="FormularioCita" onSubmit={handleSubmit}>
        <input
          className="input-producto"
          type="text"
          name="name"
          placeholder="Nombre del servicio"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="input-producto"
          type="text"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="input-producto"
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
        />
        <div>
          <select
            className="input-producto"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
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
          <button className="dropbtn succes" type="submit">
            Guardar
          </button>
          <Link className="dropbtn danger" to="/list-catalog">
            Regresar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default FormularioEditarProducto;
