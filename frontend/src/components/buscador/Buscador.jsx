// Se utiliza en CitaListar.js
// Se utiliza en PacientesListar.js
// Se utiliza en UsuariosListar.js
import "./styles-buscador.css";

function Buscador({ placeholder, value, onSearchChange }) {
  return (
    <div className="buscador-container">
      <div className="input-wrapper">
        <input
          type="text"
          className="buscador-input"
          placeholder={placeholder}
          onChange={onSearchChange}
          value={value}
        />
      </div>
    </div>
  );
}

export default Buscador;
