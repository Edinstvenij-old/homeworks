document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".js--form");
  const input = document.querySelector(".js--form__input");
  const todosWrapper = document.querySelector(".js--todos-wrapper");

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    todosWrapper.innerHTML = "";
    tasks.forEach((task, index) => addTaskToDOM(task, index));
  }

  function addTaskToDOM(task, index) {
    const li = document.createElement("li");
    li.className = `todo-item ${task.completed ? "todo-item--checked" : ""}`;
    li.innerHTML = `
          <input type="checkbox" ${
            task.completed ? "checked" : ""
          } data-index="${index}">
          <span class="todo-item__description">${task.text}</span>
          <button class="todo-item__delete" data-index="${index}">Видалити</button>
      `;
    todosWrapper.appendChild(li);
  }

  function addTask(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
  }

  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }

  function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }

  todosWrapper.addEventListener("click", function (e) {
    if (e.target.classList.contains("todo-item__delete")) {
      deleteTask(e.target.dataset.index);
    } else if (e.target.type === "checkbox") {
      toggleTask(e.target.dataset.index);
    }
  });

  form.addEventListener("submit", addTask);
  loadTasks();
});
