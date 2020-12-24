import React, {
  useContext,
  useEffect,
} from 'react';
import Table from 'react-bootstrap/Table';
import { generate as generateKey } from 'shortid';

import { store } from '@src/store';
import PersonService from '@src/services/person-service';
import PersonRow from '@components/person-row';

const fetchPeopleData = async (dispatch, fetchSize) => {
  const personService = new PersonService();
  const fetchSizeMapping = {
    small: () => personService.getPeopleData('small'),
    large: () => personService.getPeopleData('large'),
  };
  const fittingFetchFunction = fetchSizeMapping[fetchSize];
  const fetchedPeopleData = await fittingFetchFunction();

  dispatch({
    type: 'PEOPLE.SUCCESS',
    payload: fetchedPeopleData,
  });
};

const PersonTable = () => {
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const {
    people,
    dataFetchSize,
    selectedPerson,
  } = state;
  const { peopleList, loading, failed } = people;

  useEffect(() => {
    fetchPeopleData(dispatch, dataFetchSize);
  }, [dispatch, dataFetchSize]);

  const renderPerson = (personData, key) => (
    <PersonRow
      personData={personData}
      key={generateKey()}
      active={
        selectedPerson && personData.id === selectedPerson.id
      }
    />
  );

  if (failed) {
    return <p>task failed successfully</p>;
  }

  if (loading) {
    return <p>loading</p>;
  }

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

export default PersonTable;
