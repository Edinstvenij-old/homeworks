import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, hasNext, hasPrevious, onNext, onPrev }) => (
  <div className="flex justify-between items-center mt-6">
    <button
      onClick={onPrev}
      disabled={!hasPrevious}
      className={`flex items-center gap-2 px-4 py-2 rounded transition ${
        hasPrevious
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      <ChevronLeft size={18} />
      Назад
    </button>
    <span className="text-lg font-medium">
      Страница <span className="font-bold">{currentPage}</span>
    </span>
    <button
      onClick={onNext}
      disabled={!hasNext}
      className={`flex items-center gap-2 px-4 py-2 rounded transition ${
        hasNext
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      Вперёд
      <ChevronRight size={18} />
    </button>
  </div>
);

export default Pagination;
