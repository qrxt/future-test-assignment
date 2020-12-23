import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';

import { store } from '@src/store';
import styles from './control-panel.module.css';

const onLessBtnClick = (dispatch) => {
  dispatch({
    type: 'PEOPLE.FETCH',
  });
  dispatch({
    type: 'FETCHSIZE.SET',
    payload: 'small',
  });
};

const onMoreBtnClick = (dispatch) => {
  dispatch({
    type: 'PEOPLE.FETCH',
  });
  dispatch({
    type: 'FETCHSIZE.SET',
    payload: 'large',
  });
};

const ControlPanel = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { dataFetchSize } = state;

  return (
    <div className={styles.buttons}>
      <Button
        disabled={dataFetchSize === 'small'}
        className={styles.button}
        onClick={() => onLessBtnClick(dispatch)}
      >
        Меньше данных
      </Button>
      <Button
        disabled={dataFetchSize === 'large'}
        className={styles.button}
        onClick={() => onMoreBtnClick(dispatch)}
      >
        Больше данных
      </Button>
    </div>
  );
};

export default ControlPanel;
