import React, { useContext } from 'react';

import { store } from '@src/store';
import ControlPanel from '@components/control-panel';
import PersonTable from '@components/person-table';
import SelectedPerson from '@components/selected-person';

import styles from './app.module.css';

const App = () => {
  const globalState = useContext(store);
  const { state } = globalState;
  const { selectedPerson } = state;

  return (
    <div className={styles.app}>
      <div className={styles['page-wrapper']}>
        <div className={styles.page}>
          <ControlPanel />
          <PersonTable />
          { selectedPerson && <SelectedPerson /> }
        </div>
      </div>
    </div>
  );
};

export default App;
