import React, {
  useContext,
  useEffect,
} from 'react';
import Table from 'react-bootstrap/Table';
import { generate as generateKey } from 'shortid';

import { store } from '@src/store';
import PersonService from '@src/services/person-service';
import PersonRow from '@components/person-row';

const fetchPeopleData = async (dispatch) => {
  const personService = new PersonService();
  const fetchedPeopleData = await personService
    .getPeopleData();

  dispatch({
    type: 'PEOPLE.SUCCESS',
    payload: fetchedPeopleData,
  });
};

const PersonTable = () => {
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const { people: peopleList } = state;

  useEffect(() => {
    fetchPeopleData(dispatch);
  }, [dispatch]);

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

      <tbody>{ peopleList.map(renderPerson) }</tbody>
    </Table>
  );
};

PersonTable.defaultProps = {
  peopleList: [],
};

export default PersonTable;
