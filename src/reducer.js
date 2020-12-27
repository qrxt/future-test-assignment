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
  sortOptions: { sortBy: null, order: null },

  addNew: {
    displayForm: false,
    recordData: null,
  },
};

const reducer = (state, action) => {
  const typesMapping = {
    RESET: () => initialState,

    // Fetch Size
    'FETCHSIZE.SET': () => ({
      ...state,

      filter: null,
      dataFetchSize: action.payload,
      selectedPerson: null,
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

      people: {
        ...state.people,

        page: 1,
      },

      filter: action.payload,
    }),

    // Sort
    'SORT.SET': () => ({
      ...state,

      people: {
        ...state.people,

        page: 1,
      },
      sortOptions: action.payload,
    }),

    // Add New Form
    'ADD_NEW.FORM_SHOW': () => ({
      ...state,

      addNew: {
        ...state.addNew,

        displayForm: !state.addNew.displayForm,
      },
    }),

    'ADD_NEW.ADD': () => ({
      ...state,

      addNew: {
        ...state.addNew,

        displayForm: false,
      },

      people: {
        ...state.people,

        peopleList: [
          action.payload,
          ...state.people.peopleList,
        ],
      },
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
