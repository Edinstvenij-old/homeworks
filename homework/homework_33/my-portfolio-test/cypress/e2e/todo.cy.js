describe("TODO App", () => {
  const today = new Date().toISOString().split("T")[0];

  beforeEach(() => {
    cy.visit("/todo");
    cy.get('[data-testid="new-task-input"]', { timeout: 10000 }).should(
      "be.visible"
    );
  });

  it("1. Привязка задачи к дате через календарь", () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const todayFormatted = formatDate(today);
    const tomorrowFormatted = formatDate(tomorrow);

    // Выбрать сегодняшнюю дату в календаре
    cy.get('[data-testid="calendar-day-' + todayFormatted + '"]').click();

    // Добавить задачу
    cy.get('[data-testid="new-task-input"] input').type("Задача на сегодня");
    cy.get('[data-testid="add-task-button"]').click();
    cy.contains("Задача на сегодня").should("be.visible");

    // Переключиться на завтрашнюю дату
    cy.get('[data-testid="calendar-day-' + tomorrowFormatted + '"]').click();

    cy.contains("Задача на сегодня").should("not.exist");

    // Вернуться обратно
    cy.get('[data-testid="calendar-day-' + todayFormatted + '"]').click();

    cy.contains("Задача на сегодня").should("be.visible");
  });

  it("2. Добавление новой задачи", () => {
    cy.get('[data-testid="new-task-input"] input')
      .type("Моя новая задача")
      .should("have.value", "Моя новая задача");

    cy.get('[data-testid="add-task-button"]').click();

    cy.contains("Моя новая задача").should("be.visible");
  });

  it("3. Изменение задачи", () => {
    // Добавляем задачу
    cy.get('[data-testid="new-task-input"] input').type("Редактируемая задача");
    cy.get('[data-testid="add-task-button"]').click();

    // Нажимаем на кнопку редактировать
    cy.contains("Редактируемая задача")
      .parent()
      .find('button[aria-label="редактировать"]')
      .click();

    // Меняем текст
    cy.get('input[value="Редактируемая задача"]')
      .clear()
      .type("Обновлённая задача{enter}");

    // Проверяем новый текст
    cy.contains("Обновлённая задача").should("be.visible");
  });

  it("4. Отмена изменения задачи", () => {
    cy.get('[data-testid="new-task-input"] input').type("Задача для отмены");
    cy.get('[data-testid="add-task-button"]').click();

    cy.contains("Задача для отмены")
      .parent()
      .find('button[aria-label="редактировать"]')
      .click();

    // Меняем текст, но нажимаем Escape
    cy.get('input[value="Задача для отмены"]')
      .clear()
      .type("Изменения отменены")
      .type("{esc}");

    // Проверяем, что текст остался прежним
    cy.contains("Задача для отмены").should("be.visible");
    cy.contains("Изменения отменены").should("not.exist");
  });

  it("5. Отметить задачу как выполненную", () => {
    cy.get('[data-testid="new-task-input"] input').type("Завершить задачу");
    cy.get('[data-testid="add-task-button"]').click();

    cy.contains("Завершить задачу")
      .parent()
      .find('input[type="checkbox"]')
      .check();

    // Проверка визуального стиля зачёркивания
    cy.contains("Завершить задачу")
      .should("have.css", "text-decoration")
      .and("include", "line-through");
  });

  it("6. Удалить задачу", () => {
    cy.get('[data-testid="new-task-input"] input').type("Удаляемая задача");
    cy.get('[data-testid="add-task-button"]').click();

    cy.contains("Удаляемая задача")
      .parent()
      .find('button[aria-label="удалить"]')
      .click();

    cy.contains("Удаляемая задача").should("not.exist");
  });
});
