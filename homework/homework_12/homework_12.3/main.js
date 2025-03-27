document.getElementById("addTask").addEventListener("click", function() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText !== "") {
      const li = document.createElement("li");
      li.innerHTML = `${taskText} <button class="delete">Видалити</button>`;
      document.getElementById("taskList").appendChild(li);
      input.value = "";
  }
});

document.getElementById("taskList").addEventListener("click", function(event) {
  if (event.target.classList.contains("delete")) {
      event.target.parentElement.remove();
  }
});
