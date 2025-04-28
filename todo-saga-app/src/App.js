import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Todo App
        </h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}
