import React from 'react';

const PaginationControls = ({ pagination, onPageChange }) => {
  const { page, limit, totalCount } = pagination;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    // Center horizontally without affecting height
    <div className="flex justify-center mt-5 place-content-center">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ${
            page === i + 1 ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
