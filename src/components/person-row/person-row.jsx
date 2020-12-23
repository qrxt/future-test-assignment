import React from 'react';
import PropTypes from 'prop-types';

import styles from './person-row.module.css';

const PersonRow = ({ personData }) => {
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
