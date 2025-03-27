$(document).ready(function () {
  // Автоматическое управление кнопкой "Добавить"
  $("#taskInput")
    .on("input", function () {
      $("#addTask").prop("disabled", !$(this).val().trim());
    })
    .trigger("input"); // Проверяем кнопку при загрузке

  // Добавление задачи
  $(document).on("click", "#addTask", function () {
    let taskText = $("#taskInput").val().trim();
    if (!taskText) return;

    let safeTaskText = $("<div>").text(taskText).html(); // XSS защита
    let taskItem = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="task-text">${safeTaskText}</span>
        <div class="btn-group">
          <button class="btn btn-info btn-sm view-task">👁 Переглянути</button>
          <button class="btn btn-danger btn-sm delete-task">🗑 Видалити</button>
        </div>
      </li>`;

    $("#taskList").append(taskItem);
    $("#taskInput").val("").trigger("input").focus(); // Очистка + обновление кнопки
  });

  // Открытие модального окна при клике на задачу (не только на кнопку)
  $(document).on("click", ".list-group-item", function (e) {
    if (!$(e.target).hasClass("delete-task")) {
      // Исключаем кнопку удаления
      $("#taskDetails").text($(this).find(".task-text").text());
      $("#taskModal").modal("show");
    }
  });

  // Фокус на инпут после закрытия модального окна
  $("#taskModal").on("hidden.bs.modal", function () {
    $("#taskInput").focus();
  });

  // Удаление задачи с анимацией
  $(document).on("click", ".delete-task", function () {
    $(this)
      .closest("li")
      .fadeOut(300, function () {
        $(this).remove();
      });
  });
});
