import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { generate as generateKey } from 'shortid';

import PersonRow from '@components/person-row';

const PersonTable = ({ peopleList }) => {
  const renderPerson = (personData, key) => (
    <PersonRow personData={personData} key={generateKey()} />
  );

  return (
    <Table responsive bordered>
      <thead>
        <tr>
          <th>id</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>email</th>
          <th>phone</th>
        </tr>
      </thead>
      <tbody>
        {
          peopleList.map(renderPerson)
        }
      </tbody>
    </Table>
  );
};

PersonTable.defaultProps = {
  peopleList: [],
};

PersonTable.propTypes = {
  peopleList: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

export default PersonTable;
