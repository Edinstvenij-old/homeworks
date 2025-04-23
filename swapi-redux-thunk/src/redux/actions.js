import axios from "axios";
import { handleError } from "./handleError";
import { extractIdFromUrl } from "./utils";

export const fetchPeople =
  (page = 1) =>
  async (dispatch) => {
    dispatch({ type: "FETCH_PEOPLE_REQUEST" });

    try {
      const response = await axios.get(
        `https://swapi.py4e.com/api/people/?page=${page}`
      );

      const resultsWithIds = response.data.results.map((person) => ({
        ...person,
        id: extractIdFromUrl(person.url),
      }));

      dispatch({
        type: "FETCH_PEOPLE_SUCCESS",
        payload: {
          results: resultsWithIds,
          next: response.data.next,
          previous: response.data.previous,
          page,
        },
      });
    } catch (error) {
      const errorMessage = handleError(error);
      dispatch({
        type: "FETCH_PEOPLE_FAILURE",
        payload: errorMessage,
      });
    }
  };

export const fetchPersonDetails = (person) => async (dispatch) => {
  dispatch({ type: "FETCH_PERSON_DETAILS_REQUEST", payload: person.name });

  try {
    const homeworldResponse = await axios.get(person.homeworld);
    const homeworld = homeworldResponse.data.name;

    const filmsPromises =
      person.films && person.films.length > 0
        ? person.films.map((url) => axios.get(url))
        : [];
    const filmsResponse =
      filmsPromises.length > 0 ? await Promise.all(filmsPromises) : [];
    const films = filmsResponse.map((f) => f.data.title);

    const details = {
      homeworld,
      films,
      id: person.id,
    };

    dispatch({
      type: "FETCH_PERSON_DETAILS_SUCCESS",
      payload: { name: person.name, details },
    });
  } catch (error) {
    const errorMessage = handleError(error);
    dispatch({
      type: "FETCH_PERSON_DETAILS_FAILURE",
      payload: { name: person.name, error: errorMessage },
    });
  }
};

export const clearPeople = () => ({
  type: "CLEAR_PEOPLE",
});
