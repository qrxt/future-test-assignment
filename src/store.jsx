import React, {
  createContext,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from '@src/reducer';

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const providerValue = {
    state: state || initialState,
    dispatch,
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
