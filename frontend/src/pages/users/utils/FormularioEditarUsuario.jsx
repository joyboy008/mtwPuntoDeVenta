import React from "react";
import { Roles } from "../../../utils/constants";

export function FormularioEditarUsuario({ form, handleSubmit, handleChange }) {
  return (
    <div>
      <form className="FormularioCita" onSubmit={handleSubmit}>
        <input
          className="input-citas"
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="input-citas"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="input-citas"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <div>
          <select
            className="input-citas"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            {Object.entries(Roles).map(([key, value]) => (
              <option key={value} value={value}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <select
            className="input-citas"
            name="is_active"
            value={form.is_active}
            onChange={handleChange}
          >
            <option value={true}>Activo</option>
            <option value={false}>Desactivado</option>
          </select>
        </div>
        <button className="dropbtn succes" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default FormularioEditarUsuario;
