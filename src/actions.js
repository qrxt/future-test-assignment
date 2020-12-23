const peopleSuccess = (state, payload) => ({
  ...state,
  people: payload,
});

const personSelect = (state, payload) => ({
  ...state,
  selectedPerson: payload,
});

export {
  peopleSuccess,
  personSelect,
};
