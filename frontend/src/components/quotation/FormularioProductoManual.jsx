import React from "react";
import { services } from "../../utils/constants";

export function FormularioProductoManual({
  handleAddManual,
  manualForm,
  handleManualChange,
  resetManual,
}) {
  return (
    <div>
      <form className="quotation-manual-form" onSubmit={handleAddManual}>
        <select
          className="input-citas"
          name="category"
          value={manualForm.category}
          onChange={handleManualChange}
        >
          <option value="">Categoría</option>
          {services.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          className="input-citas"
          type="text"
          name="name"
          placeholder="Nombre del servicio"
          value={manualForm.name}
          onChange={handleManualChange}
        />
        <input
          className="input-citas"
          type="text"
          name="description"
          placeholder="Descripción (opcional)"
          value={manualForm.description}
          onChange={handleManualChange}
        />
        <input
          className="input-citas"
          type="number"
          name="price"
          placeholder="Precio (Q)"
          min="0.01"
          step="0.01"
          value={manualForm.price}
          onChange={handleManualChange}
        />
        <div className="quotation-manual-actions">
          <button className="dropbtn succes" type="submit">
            Agregar
          </button>
          <button
            className="dropbtn danger"
            type="button"
            onClick={resetManual}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
export default FormularioProductoManual;
