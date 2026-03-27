import { memo, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Buscador from "../buscador/Buscador";
import PaginationControls from "./PaginationControls";
import Table from "./Table";
import TableUsers from "./TableUsers";

const ListarData = memo(function ListarData({
  title,
  fetchFunction,
  searchFields,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setIsLoading(true);
    fetchFunction()
      .then((response) => {
        setData(response.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [fetchFunction]);

  const getFilteredData = (data) => {
    if (criteria) {
      return data.filter((item) =>
        searchFields.some((field) =>
          item[field]
            ?.toString()
            .toLowerCase()
            .includes(criteria.toLowerCase()),
        ),
      );
    }
    return data;
  };

  // Filtra los datos según el criterio de búsqueda
  const filteredData = getFilteredData(data);

  // Cálculo para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (e) => {
    setCriteria(e.target.value);
    setCurrentPage(1); // Reinicia la página cuando cambia el criterio de búsqueda
  };

  return (
    <div className="centrar__tables">
      <Buscador
        placeholder={`Buscar ${title.toLowerCase()}...`}
        value={criteria}
        onSearchChange={handleSearchChange}
      />
      {isLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : title === "Users" ? (
        <TableUsers title={title} data={currentData} />
      ) : (
        <Table title={title} data={currentData} />
      )}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
      />
    </div>
  );
});

export default ListarData;
