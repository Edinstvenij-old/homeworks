describe("TODO App", () => {
  const today = new Date().toISOString().split("T")[0];

  beforeEach(() => {
    cy.visit("/todo");
    cy.get('[data-testid="new-task-input"]', { timeout: 10000 }).should(
      "be.visible"
    );
  });

  it("1. Добавление новой задачи", () => {
    cy.get('[data-testid="new-task-input"] input')
      .type("Моя новая задача")
      .should("have.value", "Моя новая задача");

    cy.get('[data-testid="add-task-button"]').click();

    cy.contains("Моя новая задача").should("be.visible");
  });

  it("Изменение задачи", () => {
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

  it("Отметить задачу как выполненную", () => {
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

  it("Удалить задачу", () => {
    cy.get('[data-testid="new-task-input"] input').type("Удаляемая задача");
    cy.get('[data-testid="add-task-button"]').click();

    cy.contains("Удаляемая задача")
      .parent()
      .find('button[aria-label="удалить"]')
      .click();

    cy.contains("Удаляемая задача").should("not.exist");
  });
});
