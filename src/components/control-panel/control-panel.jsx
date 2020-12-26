import React, {
  useContext,
  useState,
} from 'react';
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

const onFilterFormSubmit = (dispatch, payload, evt) => {
  evt.preventDefault();

  dispatch({
    type: 'FILTER.SET',
    payload,
  });
};

const ControlPanel = () => {
  const globalState = useContext(store);
  const [filter, setFilter] = useState(null);
  const { state, dispatch } = globalState;
  const { dataFetchSize, people } = state;
  const { loading } = people;

  return (
    <section>
      <h2 className="visually-hidden">
        Панель управления
      </h2>

      <div className={styles.buttons}>
        <Button
          disabled={loading || dataFetchSize === 'small'}
          className={styles.button}
          onClick={() => onLessBtnClick(dispatch)}
          title="32 строки, без задержки"
        >
          Меньше данных
        </Button>
        <Button
          disabled={loading || dataFetchSize === 'large'}
          className={styles.button}
          onClick={() => onMoreBtnClick(dispatch)}
          title="1000 строк, синтетическая задержка"
        >
          Больше данных
        </Button>
      </div>

      <div className={styles.filter}>
        <Form onSubmit={(evt) => onFilterFormSubmit(dispatch, filter, evt)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Искать</Form.Label>
            <Form.Control
              type="text"
              disabled={loading}
              placeholder="Какие-нибудь данные пользователей"
              title="Это могут быть данные из любого поля"
              onChange={(evt) => {
                setFilter(evt.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Для фильтрации нажмите Найти еще раз
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
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
