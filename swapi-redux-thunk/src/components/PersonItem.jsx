import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PersonItem = ({ person }) => {
  if (!person || !person.name) {
    return null;
  }

  return (
    <li>
      <Link
        to={`/person/${encodeURIComponent(person.name)}`}
        className="flex items-center justify-between bg-white p-4 rounded shadow hover:bg-gray-100 transition"
        aria-label={`Персонаж ${person.name}`}
      >
        <div>
          <p className="font-semibold text-lg text-gray-800">{person.name}</p>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>
    </li>
  );
};

export default PersonItem;
