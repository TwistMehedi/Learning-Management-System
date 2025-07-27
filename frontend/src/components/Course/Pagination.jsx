const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  };

  return (
    <div className="join flex items-center justify-center mt-6 flex-wrap">
      <button
        className="join-item btn btn-outline"
         onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`join-item btn btn-square ${
            page === currentPage ? "bg-blue-500 text-white border-blue-500" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        className="join-item btn btn-outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;