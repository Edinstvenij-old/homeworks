import axios from "axios";

export const getPeople = async (url = "https://swapi.py4e.com/api/people/") => {
  try {
    const response = await axios.get(url);
    return { results: response.data.results, next: response.data.next };
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    throw error;
  }
};
