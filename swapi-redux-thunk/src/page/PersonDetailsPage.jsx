import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPersonDetails } from "../redux/actions";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import PersonCard from "../components/PersonCard";

const PersonDetailsPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const details = useSelector(
    (state) => state.swapi.expandedPeopleDetails[name]
  );
  const person = useSelector((state) =>
    state.swapi.people.find((p) => p.name === name)
  );
  const loading = useSelector((state) => state.swapi.loading);
  const error = useSelector((state) => state.swapi.error);

  useEffect(() => {
    if (person && !details && !loading) {
      dispatch(fetchPersonDetails(person));
    }
  }, [dispatch, person, details, loading]);

  if (!person) return <p className="text-red-600">Персонаж не найден.</p>;
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Назад
      </button>

      {details && <PersonCard person={person} details={details} />}
    </div>
  );
};

export default PersonDetailsPage;
