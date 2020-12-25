import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { generate as generateKey } from 'shortid';

import { store } from '@src/store';
import PersonService from '@src/services/person-service';
import TablePlaceholder from '@components/table-placeholder';
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
  const [sortOptions, setSortOptions] = useState({
    id: null, firstName: null, lastName: null, email: null, phone: null,
  });
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

  useEffect(() => {
    fetchPeopleData(dispatch, dataFetchSize);
  }, [dispatch, dataFetchSize]);

  // Filtration Step
  const filteredPeopleList = peopleList
    .filter((personData) => filterPeople(filter, personData));

  // Pagination Step
  const totalPages = Math.ceil(filteredPeopleList.length / ITEMS_PER_PAGE);
  const currentPageDataFrom = ITEMS_PER_PAGE * (currentPage - 1);
  const currentPageDataTo = currentPageDataFrom + ITEMS_PER_PAGE;
  const currentPageData = filteredPeopleList
    .slice(currentPageDataFrom, currentPageDataTo);

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

  // Sort Step
  // const ascendingComparator = (a, b) => a - b;
  // const descendingComparator = (a, b) => b - a;
  // const sorted = Object.entries(sortOptions)
  //   .reduce((acc, [field, order]) => (
  //     acc[field]
  //       .slice()
  //       .sort(order)
  //   ), paginationItems);

  // console.log(sortedItems)

  // Render
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
    return <TablePlaceholder rowsQuantity={50} />;
  }

  const displayedOnPage = filteredPeopleList.length < ITEMS_PER_PAGE
    ? filteredPeopleList.length
    : ITEMS_PER_PAGE;

  return (
    <>
      <div className={styles.summary}>
        <p className={styles['summary-row']}>
          <span className={styles['summary-key']}>Всего записей:</span>
          { peopleList.length }
        </p>

        <p className={styles['summary-row']}>
          <span className={styles['summary-key']}>Отображено на странице:</span>
          { displayedOnPage }
        </p>
      </div>
      <Table
        responsive
        bordered
        className={styles.table}
      >
        <thead>
          <tr>
            <th
              className={styles['table-head-field']}
              // onClick={(evt) => onHeaderClick(evt.target.value)}
            >
              id
            </th>
            <th
              className={styles['table-head-field']}
              // onClick={(evt) => onHeaderClick(evt.target.value)}
            >
              firstName
            </th>
            <th
              className={styles['table-head-field']}
              // onClick={(evt) => onHeaderClick(evt.target.value)}
            >
              lastName
            </th>
            <th
              className={styles['table-head-field']}
              // onClick={(evt) => onHeaderClick(evt.target.value)}
            >
              email
            </th>
            <th
              className={styles['table-head-field']}
              // onClick={(evt) => onHeaderClick(evt.target.value)}
            >
              phone
            </th>
          </tr>
        </thead>

        <tbody>{ currentPageData.map(renderPerson) }</tbody>
      </Table>

      {
        totalPages > 1 && (
          <div className={styles['pagination-wrapper']}>
            <Pagination className={styles.pagination}>
              {
                paginationItems
              }
            </Pagination>
          </div>
        )
      }
    </>
  );
};

export default PersonTable;
