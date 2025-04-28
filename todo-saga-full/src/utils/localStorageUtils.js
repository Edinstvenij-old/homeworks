// Функция для получения всех задач из локального хранилища
export const getTasksFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

// Функция для сохранения задач в локальное хранилище
export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Функция для добавления задачи в локальное хранилище
export const addTaskToLocalStorage = (task) => {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  saveTasksToLocalStorage(tasks);
};

// Функция для обновления задачи в локальном хранилище
export const updateTaskInLocalStorage = (updatedTask) => {
  const tasks = getTasksFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasksToLocalStorage(tasks);
  }
};

// Функция для удаления задачи из локального хранилища
export const deleteTaskFromLocalStorage = (taskId) => {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage(updatedTasks);
};

export const clearTasksFromLocalStorage = () => {
  localStorage.removeItem("todos");
};
