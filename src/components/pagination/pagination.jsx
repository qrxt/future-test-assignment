import React from 'react';
import PropTypes from 'prop-types';
import { generate as generateKey } from 'shortid';
import Pagination from 'react-bootstrap/Pagination';

import styles from './pagination.module.css';

const ITEMS_PER_PAGE = 50;

const PaginationWrapper = ({ items, currentPage, onBtnClick }) => {
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const currentPageDataFrom = ITEMS_PER_PAGE * (currentPage - 1);
  const currentPageDataTo = currentPageDataFrom + ITEMS_PER_PAGE;
  const currentPageData = items.slice(currentPageDataFrom, currentPageDataTo);

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

  return (
    1
  );
};

PaginationWrapper.propTypes = {

};

export default Pagination;
