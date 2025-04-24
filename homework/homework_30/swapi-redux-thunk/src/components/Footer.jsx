import { Trash } from "lucide-react";

const Footer = ({ onClear }) => (
  <footer className="mt-8">
    <button
      onClick={onClear}
      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      <Trash size={18} />
      Очистить все данные
    </button>
  </footer>
);

export default Footer;
