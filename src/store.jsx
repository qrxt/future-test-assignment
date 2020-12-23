import React, {
  createContext,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from '@src/reducer';

const store = createContext(initialState);
const { Provider } = store;

// eslint-disable-next-line react/prop-types
const StateProvider = ({ value, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const providerValue = {
    state: state || initialState,
    dispatch,

    ...value,
  };

  return (
    <Provider
      value={providerValue}
    >
      { children }
    </Provider>
  );
};

StateProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { store, StateProvider };
