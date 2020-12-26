import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { generate as generateKey } from 'shortid';

import compareStrings from '@src/utils/compareStrings';
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
    sortBy: null,
    order: null,
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

  // Sort Step
  const { sortBy, order } = sortOptions;
  const sortedPeopleList = filteredPeopleList
    .slice();

  // Pagination Step
  const totalPages = Math.ceil(sortedPeopleList.length / ITEMS_PER_PAGE);
  const currentPageDataFrom = ITEMS_PER_PAGE * (currentPage - 1);
  const currentPageDataTo = currentPageDataFrom + ITEMS_PER_PAGE;
  const currentPageData = sortedPeopleList
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

  //

  const headingItems = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
  ];

  return (
    <>
      <div className={styles.summary}>
        <p className={styles['summary-row']}>
          <span className={styles['summary-key']}>Всего записей:</span>
          { filteredPeopleList.length }
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
            {
              headingItems
                .map((heading) => {
                  const isAsc = sortBy === heading && order === 'asc';
                  const isDesc = sortBy === heading && order === 'desc';

                  return (
                    <th
                      className={cn(
                        styles['table-head-field'],
                        { [styles['heading-asc']]: isAsc },
                        { [styles['heading-desc']]: isDesc },
                      )}
                      key={generateKey()}
                      onClick={() => {
                        const orderByPrevious = sortBy === heading
                          ? 'asc'
                          : 'desc';
                        const nextOrder = orderByPrevious === 'asc'
                          ? 'desc'
                          : 'asc';

                        setSortOptions({ sortBy: heading, order: nextOrder });
                      }}
                    >
                      { heading }
                    </th>
                  );
                })
            }
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
