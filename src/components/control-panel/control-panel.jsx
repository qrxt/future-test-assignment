import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    <section>
      <h2 className="visually-hidden">
        Панель управления
      </h2>

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

      <div className={styles.filter}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Искать</Form.Label>
            <Form.Control type="text" placeholder="Какие-нибудь данные пользователей" />
            <Form.Text className="text-muted">
              Для фильтрации нажмите Найти еще раз
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={styles.['btn-find']}
          >
            Найти
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default ControlPanel;
