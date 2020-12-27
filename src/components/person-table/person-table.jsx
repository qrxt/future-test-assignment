import React, {
  useContext,
  useEffect,
} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { generate as generateKey } from 'shortid';

import { store } from '@src/store';
import compareStrings from '@src/utils/compareStrings';
import FormAddRecord from '@components/form-add-record';
import PersonService from '@src/services/person-service';
import ErrorIndicator from '@components/error-indicator';
import TablePlaceholder from '@components/table-placeholder';
import PersonRow from '@components/person-row';
import Heading from './heading';
import styles from './person-table.module.css';

const ITEMS_PER_PAGE = 50;

const fetchPeopleData = async (dispatch, fetchSize) => {
  const personService = new PersonService();
  const fetchSizeMapping = {
    small: () => personService.getPeopleData('small'),
    large: () => personService.getPeopleData('large'),
  };
  const fittingFetchFunction = fetchSizeMapping[fetchSize];

  try {
    const fetchedPeopleData = await fittingFetchFunction();

    dispatch({
      type: 'PEOPLE.SUCCESS',
      payload: fetchedPeopleData,
    });
  } catch (err) {
    dispatch({
      type: 'PEOPLE.FAILED',
    });
  }
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

const onShowFormBtnClick = (dispatch) => {
  dispatch({
    type: 'ADD_NEW.FORM_SHOW',
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
    sortOptions,
    addNew,
  } = state;
  const {
    peopleList,
    loading,
    failed,
    page: currentPage,
  } = people;
  const { displayForm } = addNew;

  useEffect(() => {
    fetchPeopleData(dispatch, dataFetchSize);
  }, [dispatch, dataFetchSize, failed]);

  // Filtration Step
  const filteredPeopleList = peopleList
    .filter((personData) => filterPeople(filter, personData));

  // Sort Step
  const { sortBy, order } = sortOptions;
  const sortedPeopleList = filteredPeopleList
    .slice()
    .sort((curr, next) => (
      order && order === 'asc'
        ? compareStrings(curr[sortBy], next[sortBy])
        : compareStrings(next[sortBy], curr[sortBy])
    ));

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
    return <ErrorIndicator />;
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
          <span className={styles['summary-key']}>
            Всего записей:
          </span>
          { filteredPeopleList.length }
        </p>

        <p className={styles['summary-row']}>
          <span className={styles['summary-key']}>
            Отображено на странице:
          </span>
          { displayedOnPage }
        </p>
      </div>

      <Button
        className={styles['btn-add']}
        onClick={() => { onShowFormBtnClick(dispatch); }}
      >
        { displayForm ? 'Убрать форму' : 'Добавить запись' }
      </Button>
      { displayForm && <FormAddRecord /> }

      <Table
        responsive
        bordered
        className={styles.table}
      >
        <Heading />

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
