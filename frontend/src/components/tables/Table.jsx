import "./styles_table.css";
import CardsCitas from "../../pages/appointments/utils/CardsCitas";

function Table({ title, data, whatIs }) {
  return (
    <main className="table" id="customers_table">
      <section className="table__header">
        <h3>Listado de {title}</h3>
      </section>
      <section className="table__body">
        <table>
          <tbody>
            {data.map((cita) => (
              <tr key={cita.id}>
                <td>
                  <CardsCitas cita={cita} whatIs={whatIs} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Table;
