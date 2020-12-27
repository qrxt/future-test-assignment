import React, { useContext } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { store } from '@src/store';
import styles from './person-row.module.css';

const PersonRow = ({ personData, active }) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
  } = personData;

  return (
    <tr
      className={cn(
        styles.row,
        { [styles.active]: active },
      )}
      tabIndex="0"
      role="button"
      onClick={
        () => {
          dispatch({
            type: 'PERSON.SELECT',
            payload: personData,
          });
        }
      }
    >
      <td>{ id }</td>
      <td>{ firstName }</td>
      <td>{ lastName }</td>
      <td>{ email }</td>
      <td>{ phone }</td>
    </tr>
  );
};

PersonRow.defaultProps = {
  active: false,
};

PersonRow.propTypes = {
  personData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool,
};

export default PersonRow;
