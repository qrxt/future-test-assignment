// import {
//   // fetch people
//   peopleSuccess,

//   // pick person
//   personSelect,
// } from '@src/actions';

const initialState = {
  people: [],
  dataFetchSize: 'small',
  selectedPerson: null,
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
      people: [],
    }),

    'PEOPLE.SUCCESS': () => ({
      ...state,
      people: action.payload,
    }),

    // Person Select
    'PERSON.SELECT': () => ({
      ...state,
      selectedPerson: action.payload,
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
