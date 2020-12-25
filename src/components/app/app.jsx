import React, { useContext } from 'react';
import cn from 'classnames';

import { store } from '@src/store';
import ControlPanel from '@components/control-panel';
import PersonTable from '@components/person-table';
import SelectedPerson from '@components/selected-person';

import styles from './app.module.css';

// К сожалению, filltext.com не гарантирует,
// что идентификаторы полученных данных будут уникальны,
// поэтому могут встречаться проблемы с подсвечиванием
// элементов с различным контентом, но одинаковым
// идентификатором.
// По этой же причине в проекте используется
// библиотека для генерации ключей
// (поскольку неуникальные идентификаторы не
// могут быть корректными ключами компонентов).

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
