import React, { useContext } from 'react';
import cn from 'classnames';

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
    <div className={cn(styles.app)}>
      <div
        className={cn(
          styles['page-wrapper'],
          'container d-flex justify-content-center',
        )}
      >
        <div className={cn(styles.page, 'col-8')}>
          <ControlPanel />
          <PersonTable />
          { selectedPerson && <SelectedPerson /> }
        </div>
      </div>
    </div>
  );
};

export default App;
