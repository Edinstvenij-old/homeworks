import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PeopleList from "./components/PeopleList";
import PersonDetailsPage from "./page/PersonDetailsPage";
import NotFoundPage from "./page/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <header className="text-3xl font-bold p-6 bg-gray-800 text-white shadow-md">
          SWAPI Redux Thunk
        </header>

        <main className="flex-grow p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<PeopleList />} />
            <Route path="/person/:name" element={<PersonDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="p-4 bg-white text-center text-sm text-gray-500 border-t shadow-inner">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium">SWAPI App</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
