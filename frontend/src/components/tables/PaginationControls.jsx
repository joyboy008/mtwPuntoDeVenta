// PaginationControls.js

function PaginationControls({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <div className="pagination">
      {currentPage !== 1 && (
        <button
          className="dropbtn danger"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
      )}

      <span>
        {currentPage} de {totalPages}
      </span>
      {totalPages > 1 && currentPage < totalPages && (
        <button
          className="dropbtn succes"
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      )}
    </div>
  );
}

export default PaginationControls;
