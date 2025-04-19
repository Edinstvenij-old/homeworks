import TodoForm from "./features/todos/TodoForm";
import TodoList from "./features/todos/TodoList";
import { useSelector } from "react-redux";

const App = () => {
  const todos = useSelector((state) => state.todos);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-white to-green-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-black text-center text-blue-700 mb-4 animate-pulse drop-shadow">
          📝 Список Завдань
        </h1>

        <p className="text-center text-gray-600 mb-6 italic">
          Введіть нове завдання та натисніть{" "}
          <span className="font-medium text-blue-600">"Додати"</span>, щоб
          зберегти його до списку.
        </p>

        <TodoForm />

        {todos.length === 0 ? (
          <p className="text-center text-gray-500 mt-6 italic">
            Додайте своє перше завдання!
          </p>
        ) : (
          <div className="mt-6">
            <TodoList />
          </div>
        )}

        <footer className="mt-10 text-center text-sm text-gray-500 border-t pt-4">
          Загальна кількість завдань:&nbsp;
          <span className="font-bold text-blue-700">{todos.length}</span>
        </footer>
      </div>
    </div>
  );
};

export default App;
