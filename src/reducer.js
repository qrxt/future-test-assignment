const initialState = {
  people: {
    peopleList: [],
    loading: true,
    failed: false,
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
        peopleList: [],
        loading: true,
        failed: false,
      },
    }),

    'PEOPLE.FAILED': () => ({
      ...state,

      people: {
        peopleList: [],
        loading: false,
        failed: true,
      },
    }),

    'PEOPLE.SUCCESS': () => ({
      ...state,

      people: {
        peopleList: action.payload,
        loading: false,
        failed: false,
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
