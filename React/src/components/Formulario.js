// Se utiliza en PacientesActualizar.js
// Se utiliza en PacientesCrear.js

import { useState } from "react";
import Select from "./fields/Select";
import { EstadoCivil } from "../utils/constants";

function Formulario({
  title,
  data,
  onChange,
  onSubmit,
  esActualizacion,
  onGenerarConsulta,
}) {
  const [open, setOpen] = useState(false);
  const estadoCivilOptions = [
    { value: EstadoCivil.SOLTERO_A, label: "Soltero(a)" },
    { value: EstadoCivil.CASADO_A, label: "Casado(a)" },
    { value: EstadoCivil.VIUDO_A, label: "Viudo(a)" },
    { value: EstadoCivil.SEPARADO_A, label: "Separado(a)" },
    { value: EstadoCivil.DIVORCIADO_A, label: "Divorciado(a)" },
  ];

  const generoOptions = [
    {
      value: 1,
      label: "Masculino",
    },
    { value: 2, label: "Femenino" },
  ];
  const handleDatosAdicionalesClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <br />
      <div id="formulario">
        <div className="center">
          {/* Crearemos un Formulario con React */}
          <div className="formpaciente">
            <div className="formdentro">
              <header>{title} Paciente</header>
              <form
                onSubmit={(event) => {
                  onSubmit(event, { generarConsulta: false });
                }}
              >
                <div className="form first">
                  <div className="details personal">
                    <span className="title">Datos Personales</span>
                    <div className="fields">
                      <div className="input-field">
                        <label>Nombre completo</label>
                        <input
                          type="text"
                          name="nombre"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
                          value={data.nombre}
                          autoComplete="none"
                          onChange={onChange}
                          title="Ej. Josue Alejandro Morales Castillo"
                          placeholder="Nombre completo"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Teléfono</label>
                        <input
                          type="text"
                          name="telefono"
                          // onClick={(data) => {
                          //   navigator.clipboard.writeText(
                          //     data.telefono.textToCopy
                          //   );
                          // }}
                          title="Ej. 55443322"
                          pattern="[0-9]{8}"
                          autoComplete="none"
                          value={data.telefono}
                          onChange={onChange}
                          placeholder="Número de teléfono"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>DPI</label>
                        <input
                          type="text"
                          autoComplete="none"
                          name="dpi"
                          title="Ej. 2492 34823 0101"
                          pattern="[0-9]{13}"
                          value={data.dpi}
                          onChange={onChange}
                          placeholder="Ingrese el DPI"
                        />
                      </div>
                      <div className="input-field">
                        <label>Igss</label>
                        <input
                          type="text"
                          name="igss"
                          autoComplete="none"
                          pattern="[0-9]{5}"
                          value={data.igss}
                          onChange={onChange}
                          placeholder="Ejemplo: 32234"
                        />
                        {/* <!-- Si no hay igss entonces que devuelva no en el backend --> */}
                      </div>
                      <div className="input-field">
                        <label>Género</label>
                        <Select
                          id="genero"
                          name="genero"
                          key={data.id}
                          value={data.genero}
                          onChange={onChange}
                          options={generoOptions}
                        />
                      </div>

                      <div className="input-field">
                        <label>Fecha de Nacimiento</label>
                        <input
                          name="fechaNacimiento"
                          value={data.fechaNacimiento}
                          onChange={onChange}
                          type="date"
                          id="fechaNacimiento"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="details ID">
                    <span className="title">Datos de Identidad</span>
                    <div className="fields">
                      <div className="input-field">
                        <label>Email</label>
                        <input
                          type="text"
                          name="email"
                          value={data.email}
                          onChange={onChange}
                          autoComplete="none"
                          pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
                          title="Ej. Josue@centromedico.com"
                          placeholder="Ingrese el correo electrónico"
                        />
                      </div>
                      <div className="input-field">
                        <label>Dirección</label>
                        <input
                          type="text"
                          name="direccion"
                          pattern="^[A-Za-z0-9\s.,-]+$" // no me funciona
                          autoComplete="none"
                          value={data.direccion}
                          onChange={onChange}
                          title="Ej. 2da calle 5-42 zona 3"
                          placeholder="Ingrese la dirección"
                          required
                        />
                      </div>

                      <div className="input-field">
                        <label>Municipio</label>
                        <input
                          type="text"
                          name="municipio"
                          title="Ej. La Esperanza"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.municipio}
                          onChange={onChange}
                          placeholder="Ingrese el Municipio"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Departamento</label>
                        <input
                          type="text"
                          name="departamento"
                          title="Ej. Quetzaltenango"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.departamento}
                          onChange={onChange}
                          placeholder="Ingrese el Departamento"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Nacionalidad</label>
                        <input
                          type="text"
                          name="nacionalidad"
                          title="Ej. Guatemalteca"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          value={data.nacionalidad}
                          onChange={onChange}
                          placeholder="Ingrese la Nacionalidad"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`datos-adicionales details address ${
                      open ? "mostrar" : ""
                    }`}
                  >
                    <span className="title">Datos adicionales</span>
                    <div className="fields">
                      <div className="input-field">
                        <label>Etnia</label>
                        <input
                          type="text"
                          name="etnia"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          autoComplete="none"
                          value={data.etnia}
                          onChange={onChange}
                          title="Ej. Maya"
                          placeholder="ingrese la Etnia"
                          required={open}
                        />
                      </div>
                      <div className="input-field">
                        <label>Ocupación</label>
                        <input
                          type="text"
                          name="ocupacion"
                          title="Ej. Herrero"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$"
                          autoComplete="none"
                          value={data.ocupacion}
                          onChange={onChange}
                          placeholder="Ingresa la Ocupación"
                          required={open}
                        />
                      </div>
                      <div className="input-field">
                        <label>Estado Civil</label>
                        <Select
                          key={data.id}
                          name="estadoCivil"
                          value={data.estadoCivil}
                          onChange={onChange}
                          options={estadoCivilOptions}
                        />
                      </div>
                      <div className="input-field">
                        <label>Número de expediente</label>
                        <input
                          type="text"
                          autoComplete="none"
                          pattern="[0-9]*{6}"
                          name="numeroExpediente"
                          title="Ej. 3234"
                          value={data.numeroExpediente}
                          onChange={onChange}
                          placeholder="Ingresa el número de expediente"
                          required={open}
                        />
                      </div>
                      <div className="input-field">
                        <label>Causa de Muerte</label>
                        <input
                          type="text"
                          autoComplete="none"
                          name="causaDeMuerte"
                          title="O solo coloca No"
                          value={data.causaDeMuerte}
                          onChange={onChange}
                          placeholder="Ingresa el número de expediente"
                          required={open}
                        />
                      </div>
                      <div className="input-field">
                        <label>Autopsia</label>
                        <input
                          type="text"
                          autoComplete="none"
                          name="autopsia"
                          title="O solo coloca No"
                          value={data.autopsia}
                          onChange={onChange}
                          placeholder="Ingresa el resultado."
                          required={open}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="buttons">
                    <button type="submit" className="saveBtn">
                      <span className="btnText">Guardar</span>
                    </button>
                    {esActualizacion ? (
                      <button
                        onClick={(event) => {
                          onGenerarConsulta(event);
                        }}
                        type="button"
                        className="saveBtn"
                      >
                        <span className="btnText">Generar Consulta</span>
                      </button>
                    ) : null}

                    <button
                      type="button"
                      className="nxtBtn"
                      onClick={handleDatosAdicionalesClick}
                    >
                      <span className="btnText">Datos Adicionales</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Formulario;
