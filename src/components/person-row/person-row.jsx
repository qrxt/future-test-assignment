import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { store } from '@src/store';
import styles from './person-row.module.css';

const PersonRow = ({ personData }) => {
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
      className={styles.row}
      tabIndex="0"
      role="button"
      onClick={
        () => {
          dispatch({
            type: 'PERSON.SELECT',
            payload: personData,
          });
          globalState.selectPerson(personData);
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

PersonRow.propTypes = {
  personData: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default PersonRow;
