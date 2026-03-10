// Se utiliza en Formulario.js
// Se utiliza en FormularioUsuario.js

function Select({ id, name, value, options, onChange }) {
  return (
    <select id={id} name={name} value={value} onChange={onChange}>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
