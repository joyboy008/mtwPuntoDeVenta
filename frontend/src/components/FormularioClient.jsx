// Se utiliza en CitaActualizar.js
// Se utiliza en CitaCrear.js

function FormularioClient({
  title,
  onSubmit,
  onChange,
  data,
  esActualizacion,
}) {
  return (
    <div id="formulario">
      <div className="center">
        <div className="formpaciente">
          <div className="formdentro">
            <header>{title}</header>
            <form onSubmit={onSubmit}>
              <div className="form first">
                <div className="details personal">
                  <span className="title">Datos del cliente</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="none"
                        pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
                        title="Ej. Braulio Juarez"
                        onChange={onChange}
                        placeholder="Nombre del Cliente"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>NIT</label>
                      <input
                        type="text"
                        name="nit"
                        value={data.nit}
                        autoComplete="none"
                        pattern="^\d+$|^cf$|^CF$"
                        title="Nit o cf"
                        onChange={onChange}
                        placeholder="nit del cliente"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Teléfono</label>
                      <input
                        type="text"
                        name="phone"
                        title="55223939"
                        pattern="^\d{8}$"
                        value={data.phone}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="Categoria del producto"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Dirección o Referencia</label>
                      <input
                        type="text"
                        name="address"
                        title="Ej. 100"
                        pattern="^[A-Za-z0-9\s,.-]+$"
                        value={data.address}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="2da calle 3-23 zona 3 san juan ostuncalco"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>email</label>
                      <input
                        type="text"
                        name="email"
                        title="Ej. ejemplo@restaurante.com"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        value={data.email}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="rouos21@hmial.com"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="buttons">
                  <button type="submit" className="saveBtn">
                    <span className="btnText">Guardar</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioClient;
