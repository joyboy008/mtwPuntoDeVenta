// Se utiliza en UsuariosActualizar.js
// Se utiliza en UsuariosCrear.js

import { Fragment } from "react";
import Select from "./fields/Select";
import { Roles } from "../utils/constants";

function Formulario({ esActualizacion, title, data, onChange, onSubmit }) {
  const rolesOptions = [
    {
      value: Roles.ADMIN,
      label: "Admin",
    },
    {
      value: Roles.MODERADOR,
      label: "Moderador",
    },
  ];
  return (
    <Fragment>
      <br />
      <div id="formulario">
        <div className="center">
          {/* Crearemos un Formulario con React */}
          <div className="formpaciente">
            <div className="formdentro">
              <header>{title}</header>
              <form onSubmit={onSubmit}>
                <div className="form first">
                  <div className="details personal">
                    <span className="title">Datos Personales</span>
                    <div className="fields">
                      <div className="input-field">
                        <label>Nombre completo</label>
                        <input
                          type="text"
                          name="name"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
                          value={data.name}
                          autoComplete="none"
                          onChange={onChange}
                          title="Ej. Josue Alejandro Morales Castillo"
                          placeholder="Nombre completo"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Username</label>
                        <input
                          type="text"
                          name="username"
                          title="Ej. jcorseir"
                          pattern="^(?![._])[A-Za-z0-9._]{4,16}(?<![._])$"
                          autoComplete="client_name"
                          value={data.username}
                          onChange={onChange}
                          placeholder="Username"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          value={data.password}
                          onChange={onChange}
                          autoComplete="none"
                          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$"
                          placeholder={
                            esActualizacion
                              ? "Nuevo password"
                              : "Ingrese su password"
                          }
                          title="Contraseña requerida de 8 caracteres (debe contener al menos una letra mayúscula, una letra minúscula y un número)"
                          required={!esActualizacion}
                        />
                      </div>
                      <div className="input-field">
                        <label>Role</label>
                        <Select
                          type="text-local"
                          name="role"
                          value={data.role}
                          autoComplete="none"
                          onChange={onChange}
                          options={rolesOptions}
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Image</label>
                        <input
                          type="text"
                          name="image"
                          autoComplete="none"
                          // pattern="[0-9]{5}"
                          title="Ej. image.png"
                          value={data.image}
                          onChange={onChange}
                          placeholder="Imagen de usuario"
                        />
                        {/* <!-- Si no hay igss entonces que devuelva no en el backend --> */}
                      </div>

                      <div className="input-field">
                        <label>Saldo en Caja</label>
                        <input
                          type="number"
                          name="cash_register"
                          value={data.cash_register}
                          onChange={onChange}
                          placeholder="Dinero"
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
    </Fragment>
  );
}

export default Formulario;
