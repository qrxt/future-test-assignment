import React from 'react';

import { ReactComponent as WarningSign } from '@public/images/failure.svg';
import styles from './error-indicator.module.css';

const ErrorIndicator = () => (
  <div className={styles.error}>
    <WarningSign
      className={styles.sign}
      width={64}
      height={64}
    />
    <p className={styles.text}>Все сломалось!</p>
  </div>
);

export default ErrorIndicator;
