export const handleError = (error) => {
  if (error.response) {
    if (error.response.status === 404) {
      return "Данные не найдены (404)";
    }
    return error.response.data.detail || error.response.data;
  } else if (error.request) {
    return "Нет ответа от сервера.";
  } else if (error.message) {
    return error.message;
  }
  return "Не удалось загрузить данные.";
};
