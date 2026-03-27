import "./styles_table.css";
import CardsUsers from "../../pages/users/utils/CardsUsers";

function TableUsers({ title, data }) {
  return (
    <main className="table" id="customers_table">
      <section className="table__header">
        <h3>Listado de {title}</h3>
      </section>
      <section className="table__body">
        <table>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>
                  <CardsUsers user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default TableUsers;
