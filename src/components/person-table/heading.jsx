import React, { useContext } from 'react';
import cn from 'classnames';
import { generate as generateKey } from 'shortid';

import { store } from '@src/store';
import styles from './heading.module.css';

const headingItems = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
];

const renderHeadingCell = (heading, dispatch, sortOptions) => {
  const { sortBy, order } = sortOptions;
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
        const nextOrder = order === 'asc' && heading === sortBy
          ? 'desc'
          : 'asc';

        const nextSortOptions = {
          sortBy: heading,
          order: nextOrder,
        };
        dispatch({
          type: 'SORT.SET',
          payload: nextSortOptions,
        });
      }}
    >
      { heading }
    </th>
  );
};

const Heading = () => {
  const globalState = useContext(store);

  const { state, dispatch } = globalState;
  const {
    sortOptions,
  } = state;

  return (
    <thead>
      <tr>
        {
          headingItems
            .map((headingData) => (
              renderHeadingCell(headingData, dispatch, sortOptions)
            ))
        }
      </tr>
    </thead>
  );
};

export default Heading;
