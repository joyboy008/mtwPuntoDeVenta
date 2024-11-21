// Se utiliza en CitaActualizar.js
// Se utiliza en CitaCrear.js

function FormularioProduct({
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
                  <span className="title">Datos del producto</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="none"
                        pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$"
                        title="Ej. Pizza Mediana"
                        onChange={onChange}
                        placeholder="Nombre del producto"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Código</label>
                      <input
                        type="text"
                        name="code"
                        value={data.code}
                        autoComplete="none"
                        // pattern=""
                        title="M8"
                        onChange={onChange}
                        placeholder="Código de producto"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Categoría</label>
                      <input
                        type="text"
                        name="category"
                        title="Ej. Pizzas"
                        pattern="^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$"
                        value={data.category}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="Categoria del producto"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Stock</label>
                      <input
                        type="text"
                        name="stock"
                        title="Ej. 100"
                        // pattern=""
                        value={data.stock}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="Cantidad de productos a ingresar"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Precio</label>
                      <input
                        type="text"
                        name="price"
                        title="Ej. 99"
                        // pattern=""
                        value={data.price}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="Valor del producto"
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Imagen</label>
                      <input
                        type="text"
                        name="image"
                        title="Ej. 100"
                        // pattern=""
                        value={data.image}
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="Imagen"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="details personal">
                  <div className="fields">
                    <div className="input-field">
                      <label>Descripción</label>
                      <textarea
                        name="description"
                        autoComplete="none"
                        onChange={onChange}
                        placeholder="información sobre el producto..."
                        value={data.description}
                        required
                      ></textarea>
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

export default FormularioProduct;
