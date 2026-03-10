import { memo, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Buscador from "../buscador/Buscador";
import PaginationControls from "./PaginationControls";
import Table from "./Table";

const ListarData = memo(function ListarData({
  title,
  fetchFunction,
  columns,
  searchFields,
  onAddClient,
  onAddProduct,
  whatIs,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState("");
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetchFunction()
      .then((response) => {
        const sortedData = (response.data || []).sort((a, b) => {
          const dateA = parseDate(a.date); // Asegúrate de que `a.date` sea el formato correcto
          const dateB = parseDate(b.date);
          return dateB - dateA; // Orden ascendente
        });
        if (whatIs === "Ventas") {
          setData(sortedData);
          setIsLoading(false);
        }
        setData(response.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [fetchFunction]);

  const parseDate = (dateString) => {
    if (!dateString) {
      return;
    }
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);
    const date = new Date(year, month - 1, day, hours, minutes);
    const offsetGuatemala = date.getTimezoneOffset() + 360;
    return new Date(date.getTime() - offsetGuatemala * 60 * 1000);
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  const getFilteredData = (data) => {
    if (criteria) {
      return data.filter((item) =>
        searchFields.some((field) =>
          item[field]?.toString().toLowerCase().includes(criteria.toLowerCase())
        )
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
      ) : (
        <Table
          onAddProduct={onAddProduct}
          onAddClient={onAddClient}
          whatIs={whatIs}
          columns={columns}
          title={title}
          data={currentData}
        />
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
