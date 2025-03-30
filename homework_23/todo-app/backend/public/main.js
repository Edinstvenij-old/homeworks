const apiUrl = "http://localhost:5000/api/todos"; // API URL

document.addEventListener("DOMContentLoaded", function () {
  fetchTodos();

  document.getElementById("addTask").addEventListener("click", addTodo);
});

async function fetchTodos() {
  const res = await fetch(apiUrl);
  const todos = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleTodo('${todo._id}', ${todo.completed})" 
            style="text-decoration: ${
              todo.completed ? "line-through" : "none"
            }; cursor: pointer;">
        ${todo.title}
      </span>
      <button class="delete" onclick="deleteTodo('${
        todo._id
      }')">Видалити</button>
    `;
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return alert("Введіть завдання!");

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  input.value = "";
  fetchTodos();
}

async function toggleTodo(id, completed) {
  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed }),
  });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  fetchTodos();
}
