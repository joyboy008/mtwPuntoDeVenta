import authProvider from "../../utils/AuthProvider";
import Buttons from "../Buttons";
import "./styles_table.css";

function Table({ title, onAddProduct, onAddClient, columns, data, whatIs }) {
  return (
    <main className="table" id="customers_table">
      <section className="table__header">
        <h3>Listado de {title}</h3>
      </section>
      <section className="table__body">
        <table>
          <thead className="table__head">
            <tr>
              {columns.map((column) => (
                <th className={column.field} key={column.field}>
                  {column.label}
                </th>
              ))}
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.field}>
                    {column.field === "image" ? (
                      <img src={row[column.field]} alt={row.name} />
                    ) : (
                      row[column.field]
                    )}
                  </td>
                ))}
                {authProvider.checkRoutePermissions("moderador") ? (
                  <td>
                    <Buttons
                      whatIs={whatIs}
                      endpoint={title.toLowerCase()}
                      data={row.id}
                      onAddProduct={onAddProduct}
                      onAddClient={onAddClient}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Table;
