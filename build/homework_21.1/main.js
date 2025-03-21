"use strict";

$(document).ready(function () {
  // Автоматическое управление кнопкой "Добавить"
  $("#taskInput").on("input", function () {
    $("#addTask").prop("disabled", !$(this).val().trim());
  }).trigger("input"); // Проверяем кнопку при загрузке

  // Добавление задачи
  $(document).on("click", "#addTask", function () {
    var taskText = $("#taskInput").val().trim();
    if (!taskText) return;
    var safeTaskText = $("<div>").text(taskText).html(); // XSS защита
    var taskItem = "\n      <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n        <span class=\"task-text\">".concat(safeTaskText, "</span>\n        <div class=\"btn-group\">\n          <button class=\"btn btn-info btn-sm view-task\">\uD83D\uDC41 \u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438</button>\n          <button class=\"btn btn-danger btn-sm delete-task\">\uD83D\uDDD1 \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n        </div>\n      </li>");
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
    $(this).closest("li").fadeOut(300, function () {
      $(this).remove();
    });
  });
});