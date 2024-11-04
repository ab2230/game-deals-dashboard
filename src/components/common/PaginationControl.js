
const PaginationControls = ({ totalPages, currentPage, onPageChange }) => (
    <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages).keys()].map((page) => (
            <button
                key={page + 1}
                onClick={() => onPageChange(page + 1)}
                className={`px-3 py-1 rounded ${currentPage === page + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
            >
                {page + 1}
            </button>
        ))}
    </div>
);

export default PaginationControls;
