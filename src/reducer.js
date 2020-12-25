const initialState = {
  people: {
    peopleList: [],
    loading: true,
    failed: false,

    page: 1,
  },
  dataFetchSize: 'small',
  selectedPerson: null,
  filter: null,
};

const reducer = (state, action) => {
  const typesMapping = {
    RESET: () => initialState,

    // Fetch Size
    'FETCHSIZE.SET': () => ({
      ...state,
      dataFetchSize: action.payload,
    }),

    // People Data Fetch
    'PEOPLE.FETCH': () => ({
      ...state,

      people: {
        ...state.people,

        peopleList: [],
        loading: true,
        failed: false,
      },
    }),

    'PEOPLE.FAILED': () => ({
      ...state,

      people: {
        ...state.people,

        peopleList: [],
        loading: false,
        failed: true,
      },
    }),

    'PEOPLE.SUCCESS': () => ({
      ...state,

      people: {
        ...state.people,

        peopleList: action.payload,
        loading: false,
        failed: false,
      },
    }),

    'PEOPLE.SET_PAGE': () => ({
      ...state,

      people: {
        ...state.people,

        page: action.payload,
      },
    }),

    // Person Select
    'PERSON.SELECT': () => ({
      ...state,
      selectedPerson: action.payload,
    }),

    // Filtration
    'FILTER.SET': () => ({
      ...state,

      filter: action.payload,
    }),
  };

  if (typesMapping[action.type]) {
    return typesMapping[action.type]();
  }

  throw new Error(
    `No such action type ${action.type}`,
  );
};

export { reducer, initialState };
