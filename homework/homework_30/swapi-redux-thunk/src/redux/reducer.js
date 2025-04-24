const initialState = {
  people: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasNext: false,
  hasPrevious: false,
  expandedPeopleDetails: {},
};

export const swapiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PEOPLE_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_PEOPLE_SUCCESS":
      return {
        ...state,
        loading: false,
        people: action.payload.results,
        hasNext: !!action.payload.next,
        hasPrevious: !!action.payload.previous,
        currentPage: action.payload.page,
        error: null,
      };

    case "FETCH_PEOPLE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        people: [],
      };

    case "CLEAR_PEOPLE":
      return {
        ...state,
        people: [],
        error: null,
        currentPage: 1,
        hasNext: false,
        hasPrevious: false,
        expandedPeopleDetails: {},
      };

    case "FETCH_PERSON_DETAILS_SUCCESS":
      return {
        ...state,
        expandedPeopleDetails: {
          ...state.expandedPeopleDetails,
          [action.payload.name]: action.payload.details,
        },
      };

    case "FETCH_PERSON_DETAILS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
