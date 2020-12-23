// import {
//   // fetch people
//   peopleSuccess,

//   // pick person
//   personSelect,
// } from '@src/actions';

const initialState = {
  people: [],
  selectedPerson: null,
};

const reducer = (state, action) => {
  const typesMapping = {
    RESET: () => initialState,

    'PEOPLE.SUCCESS': () => ({
      ...state,
      people: action.payload,
    }),

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
