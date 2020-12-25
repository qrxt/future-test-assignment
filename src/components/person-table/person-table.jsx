import React, {
  useContext,
  useEffect,
} from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { generate as generateKey } from 'shortid';

import { store } from '@src/store';
import PersonService from '@src/services/person-service';
import PersonRow from '@components/person-row';
import styles from './person-table.module.css';

const ITEMS_PER_PAGE = 50;

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

const filterPeople = (filter, personData) => {
  const entries = Object.values(personData);

  return filter
    ? entries.some(
      (value) => String(value)
        .toLowerCase()
        .includes(filter.toLowerCase()),
    )
    : true;
};

const onPageBtnClick = (dispatch, pageNumber) => {
  dispatch({
    type: 'PEOPLE.SET_PAGE',
    payload: pageNumber,
  });
};

const PersonTable = () => {
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const {
    people,
    dataFetchSize,
    selectedPerson,
    filter,
  } = state;
  const {
    peopleList,
    loading,
    failed,
    page: currentPage,
  } = people;
  const filteredPeopleList = peopleList
    .filter((personData) => filterPeople(filter, personData));

  const totalPages = Math.ceil(filteredPeopleList.length / ITEMS_PER_PAGE);
  const currentPageDataFrom = ITEMS_PER_PAGE * (currentPage - 1);
  const currentPageDataTo = currentPageDataFrom + ITEMS_PER_PAGE;
  const currentPageData = filteredPeopleList.slice(currentPageDataFrom, currentPageDataTo);

  const paginationItems = Array.from(new Array(totalPages))
    .map((page, idx) => {
      const currentBtnPage = idx + 1;

      return (
        <Pagination.Item
          key={generateKey()}
          active={currentBtnPage === currentPage}
          onClick={() => { onPageBtnClick(dispatch, currentBtnPage); }}
        >
          { currentBtnPage }
        </Pagination.Item>
      );
    });

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
    <>
      <Table
        responsive
        bordered
        className={styles.table}
      >
        <thead>
          <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>phone</th>
          </tr>
        </thead>

        <tbody>{ currentPageData.map(renderPerson) }</tbody>
      </Table>

      {
        totalPages > 1 && (
          <Pagination>
            {
              paginationItems
            }
          </Pagination>
        )
      }
    </>
  );
};

export default PersonTable;
