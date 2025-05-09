import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Todo from "../pages/Todo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const mockStore = configureStore([]);
const today = new Date().toISOString().split("T")[0];

const renderWithStore = (initialState) => {
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Todo />
      </LocalizationProvider>
    </Provider>
  );
  return store;
};

describe("Todo Page", () => {
  const initialState = {
    todos: {
      items: [],
      editId: null,
      editText: "",
    },
  };

  test("1. Рендерится заголовок", () => {
    renderWithStore(initialState);
    expect(screen.getByText(/Задачи по дате/i)).toBeInTheDocument();
  });

  test("2. Инпут позволяет вводить цифры и буквы", async () => {
    renderWithStore(initialState);
    const input = screen.getByLabelText(/Новая задача/i);
    await userEvent.type(input, "Test123");
    expect(input).toHaveValue("Test123");
  });

  test("3. Предупреждение при добавлении пустого поля", () => {
    renderWithStore(initialState);
    fireEvent.click(screen.getByText(/Добавить/i));
    expect(
      screen.getByText(/Пожалуйста, введите задачу!/i)
    ).toBeInTheDocument();
  });

  test("4. Добавление новой задачи диспатчит экшен", async () => {
    const store = renderWithStore(initialState);
    const input = screen.getByLabelText(/Новая задача/i);
    const button = screen.getByText(/Добавить/i);

    await userEvent.type(input, "Моя задача");
    await userEvent.click(button);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: "todos/addTodo",
          payload: expect.objectContaining({
            text: "Моя задача",
            date: expect.any(String),
          }),
        },
      ]);
    });
  });

  test("5. Удаление задачи", async () => {
    const state = {
      todos: {
        items: [{ id: 1, text: "Удалить меня", date: today, done: false }],
        editId: null,
        editText: "",
      },
    };
    const store = renderWithStore(state);

    expect(await screen.findByText(/Удалить меня/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /удалить/i }));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "todos/deleteTodo", payload: 1 });
  });

  test("6. Переключение статуса задачи (done)", () => {
    const state = {
      todos: {
        items: [{ id: 2, text: "Выполнить", date: today, done: false }],
        editId: null,
        editText: "",
      },
    };
    const store = renderWithStore(state);
    fireEvent.click(screen.getByRole("checkbox"));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "todos/toggleDone", payload: 2 });
  });

  test("7. Начало редактирования задачи", async () => {
    const state = {
      todos: {
        items: [{ id: 3, text: "Редагуй мене", date: today, done: false }],
        editId: null,
        editText: "",
      },
    };
    const store = renderWithStore(state);
    const editButton = await screen.findByRole("button", {
      name: /редактировать/i,
    });
    fireEvent.click(editButton);

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "todos/startEdit",
      payload: { id: 3, text: "Редагуй мене" },
    });
  });

  test("8. Задачи отображаются по выбранной дате", () => {
    const state = {
      todos: {
        items: [{ id: 4, text: "Задача на сегодня", date: today, done: false }],
        editId: null,
        editText: "",
      },
    };
    renderWithStore(state);
    expect(screen.getByText(/Задача на сегодня/i)).toBeInTheDocument();
  });
});

describe("Функциональность редактирования", () => {
  test("9. Сохранение редактирования вызывает экшен", () => {
    const state = {
      todos: {
        items: [{ id: 5, text: "Редактируй меня", date: today, done: false }],
        editId: 5,
        editText: "Обновленный текст",
      },
    };
    const store = renderWithStore(state);
    fireEvent.click(screen.getByRole("button", { name: /сохранить/i }));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "todos/saveEdit",
      payload: { id: 5, text: "Обновленный текст" },
    });
  });

  test("10. Отмена редактирования вызывает cancelEdit", () => {
    const state = {
      todos: {
        items: [{ id: 6, text: "Отмени меня", date: today, done: false }],
        editId: 6,
        editText: "Отмена",
      },
    };
    const store = renderWithStore(state);
    fireEvent.click(screen.getByRole("button", { name: /отмена/i }));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "todos/cancelEdit" });
  });

  test("11. Сообщение, если задач на дату нет", () => {
    const emptyState = {
      todos: {
        items: [],
        editId: null,
        editText: "",
      },
    };
    renderWithStore(emptyState);
    expect(screen.getByText(/на .* нет задач/i)).toBeInTheDocument();
  });

  test("12. Нажатие Enter сохраняет редактирование", () => {
    const state = {
      todos: {
        items: [{ id: 5, text: "Измени меня", date: today, done: false }],
        editId: 5,
        editText: "Обновлённый текст",
      },
    };
    const store = renderWithStore(state);

    const input = screen.getByDisplayValue("Обновлённый текст");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "todos/saveEdit",
      payload: { id: 5, text: "Обновлённый текст" },
    });
  });

  test("13. Нажатие Escape отменяет редактирование", () => {
    const state = {
      todos: {
        items: [{ id: 6, text: "Тест Escape", date: today, done: false }],
        editId: 6,
        editText: "Редактируется",
      },
    };
    const store = renderWithStore(state);

    const input = screen.getByDisplayValue("Редактируется");
    fireEvent.keyDown(input, { key: "Escape", code: "Escape" });

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "todos/cancelEdit" });
  });
});

describe("Функциональность выполненной задачи", () => {
  test("14. Выполненная задача имеет стиль зачёркнутого текста", () => {
    const state = {
      todos: {
        items: [{ id: 7, text: "Выполнено", date: today, done: true }],
        editId: null,
        editText: "",
      },
    };
    renderWithStore(state);

    const taskText = screen.getByText("Выполнено");
    expect(taskText).toHaveStyle("text-decoration: line-through");
  });

  test("15. Отображение выполненной задачи (зачёркнутый текст и aria-checked)", () => {
    const state = {
      todos: {
        items: [{ id: 1, text: "Выполненная задача", date: today, done: true }],
        editId: null,
        editText: "",
      },
    };
    renderWithStore(state);

    const todoText = screen.getByText("Выполненная задача");
    const checkbox = screen.getByRole("checkbox");

    expect(todoText).toHaveStyle("text-decoration: line-through");
    expect(checkbox).toBeChecked();
  });
});
