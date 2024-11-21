// Se utiliza en UsuariosActualizar.js
// Se utiliza en UsuariosCrear.js

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

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
                    </div>
                  </div>
                  <div className="details products">
                    <span className="title">Productos</span>
                    <div>
                      {data.products.map((product, index) => (
                        <div key={product.id || index} className="fields">
                          <div className="input-field">
                            <label>Nombre</label>
                            <input
                              type="text"
                              name="product_name"
                              value={product.product_name}
                              autoComplete="none"
                              readOnly
                              // onChange={(e) => onChange(e, index)}
                              placeholder="Nombre del producto"
                              required
                            />
                          </div>
                          <div className="input-field">
                            <label>Cantidad</label>
                            <input
                              type="text"
                              name="quantity"
                              value={product.quantity}
                              autoComplete="none"
                              readOnly
                              // onChange={(e) => onChange(e, index)}
                              placeholder="Cantidad del producto"
                              required
                            />
                          </div>
                          <div className="input-field">
                            <label>Precio</label>
                            <input
                              type="text"
                              name="price"
                              value={product.price}
                              autoComplete="none"
                              readOnly
                              // onChange={(e) => onChange(e, index)}
                              placeholder="Precio del producto"
                              required
                            />
                          </div>
                        </div>
                      ))}
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
