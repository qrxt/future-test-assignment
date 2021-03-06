import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { generate as generateKey } from 'shortid';

import styles from './table-placeholder.module.css';

const LoadingSpinner = () => (
  <div
    className={styles['spinner-wrapper']}
    title="Загрузка..."
  >
    <div className={styles.spinner}>
      <div>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <span className={styles['spinner-text']}>
        Сейчас все будет...
      </span>
    </div>
  </div>
);

const TablePlaceholder = ({ rowsQuantity }) => {
  const rows = Array
    .from(new Array(rowsQuantity))
    .map((item) => (
      <tr key={generateKey()}>
        <td className={styles.cell} />
        <td className={styles.cell} />
        <td className={styles.cell} />
        <td className={styles.cell} />
        <td className={styles.cell} />
      </tr>
    ));

  return (
    <div className={styles.wrapper}>
      <LoadingSpinner />
      <div className={styles.summary}>
        <p className={styles['summary-row']}>
          <span className={styles['summary-key']}>
            Всего записей: ...
          </span>
        </p>

        <p className={styles['summary-row']}>
          <span className={styles['summary-key']}>
            Отображено на странице: ...
          </span>
        </p>
      </div>

      <Table
        responsive
        bordered
      >
        <tbody>
          { rows }
        </tbody>
      </Table>
    </div>
  );
};

TablePlaceholder.propTypes = {
  rowsQuantity: PropTypes.number.isRequired,
};

export default TablePlaceholder;
