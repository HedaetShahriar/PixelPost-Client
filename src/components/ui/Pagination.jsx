import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage=0, totalPages=0, setPage }) => {
  return (
    <div className="flex justify-end items-center gap-2 mt-4 text-sm">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 rounded border bg-base-300 hover:bg-base-100 disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 rounded border bg-base-300 hover:bg-base-100 disabled:opacity-50"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
