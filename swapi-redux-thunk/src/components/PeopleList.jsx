import { useDispatch, useSelector } from "react-redux";
import { fetchPeople, clearPeople } from "../redux/actions";
import { useEffect } from "react";
import PersonItem from "./PersonItem";
import Pagination from "./Pagination";
import Footer from "./Footer";
import { Users } from "lucide-react";

const PeopleList = () => {
  const dispatch = useDispatch();
  const { people, loading, error, currentPage, hasNext, hasPrevious } =
    useSelector((state) => state.swapi);

  useEffect(() => {
    dispatch(fetchPeople(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => dispatch(fetchPeople(1))}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <Users size={18} />
          Загрузка персонажей
        </button>
      </div>

      {loading && (
        <p className="text-yellow-600 font-medium animate-pulse">Загрузка...</p>
      )}
      {error && <p className="text-red-600 font-medium">Ошибка: {error}</p>}

      <ul className="space-y-4 mb-6">
        {people.map((person) => (
          <PersonItem key={person.id} person={person} />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        onNext={() => dispatch(fetchPeople(currentPage + 1))}
        onPrev={() => dispatch(fetchPeople(currentPage - 1))}
      />

      <Footer onClear={() => dispatch(clearPeople())} />
    </div>
  );
};

export default PeopleList;
