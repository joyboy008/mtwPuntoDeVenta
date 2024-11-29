// Se utiliza en UsuariosActualizar.js
// Se utiliza en UsuariosCrear.js

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./tables/styles_table.css";

function FormularioVenta({ title, data }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <br />
      <div id="formulario">
        <div className="center">
          <div className="formpaciente">
            <div className="formdentro">
              <header>{title}</header>
              <form>
                <div className="form first">
                  <div className="details personal">
                    <span className="title">Datos generales</span>
                    <div className="fields">
                      <div className="input-field">
                        <label>Usuario</label>
                        <input
                          type="text"
                          name="user_name"
                          value={data.user_name}
                          autoComplete="none"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
                          title="Ej. Pizza Mediana"
                          // onChange={onChange}
                          readOnly
                          placeholder="Nombre del producto"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Cliente</label>
                        <input
                          type="text"
                          name="client_name"
                          value={data.client_name}
                          autoComplete="none"
                          // pattern=""
                          title="M8"
                          readOnly
                          // onChange={onChange}
                          placeholder="Código de producto"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>Total</label>
                        <input
                          type="text"
                          name="total"
                          title="43234546"
                          // pattern=""
                          value={data.total}
                          autoComplete="none"
                          readOnly
                          // onChange={onChange}
                          placeholder="Categoria del producto"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label>NIT</label>
                        <input
                          type="text"
                          name="client_nit"
                          value={data.client_nit}
                          autoComplete="none"
                          pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
                          title="Ej. Pizza Mediana"
                          // onChange={onChange}
                          readOnly
                          placeholder="Nombre del producto"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="details products">
                    <div>
                      <main
                        className="table__sale_details"
                        id="customers_table"
                      >
                        <section className="table__header">
                          <h3>Productos</h3>
                        </section>
                        <section className="table__body">
                          <table>
                            <thead className="table__head">
                              <tr>
                                <th>Cantidad</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.products.map((product, index) => (
                                <tr key={index}>
                                  <td>{product.quantity}</td>
                                  <td>{product.product_name}</td>
                                  <td>{product.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </section>
                      </main>
                      <div className="input-field">
                        <label>Detalle de Venta:</label>
                        <textarea
                          type="text"
                          name="sale_details"
                          value={data.sale_details}
                          autoComplete="none"
                          readOnly
                          // onChange={onChange}
                          placeholder="Detalle de la venta"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="buttons">
                    <a
                      className="dropbtn succes"
                      onClick={() => navigate("/sales")}
                    >
                      Regresar a ventas
                    </a>
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

export default FormularioVenta;
