import React, {
  useContext,
} from 'react';

import { store } from '@src/store';
import styles from './selected-person.module.css';

const SelectedPerson = () => {
  const globalState = useContext(store);
  const { state } = globalState;
  const {
    firstName,
    lastName,
    description,
    address,
  } = state.selectedPerson;

  const {
    streetAddress,
    city,
    state: countryState,
    zip,
  } = address;

  return (
    <div className={styles.person}>
      <div className={styles['data-wrapper']}>
        <p>
          Выбран пользователь:
          <b>{ `${firstName} ${lastName}` }</b>
        </p>

        <p>Описание:</p>

        <textarea defaultValue={description} />

        <dl className={styles.data}>
          <dd className={styles['data-key']}>
            Адрес проживания:
          </dd>
          <dt>
            <b>
              { streetAddress }
            </b>
          </dt>

          <dd className={styles['data-key']}>
            Город:
          </dd>
          <dt>
            <b>
              { city }
            </b>
          </dt>

          <dd className={styles['data-key']}>
            Провинция/штат:
          </dd>
          <dt>
            <b>
              { countryState }
            </b>
          </dt>

          <dd className={styles['data-key']}>
            Индекс:
          </dd>
          <dt>
            { zip }
          </dt>
        </dl>
      </div>
    </div>
  );
};

export default SelectedPerson;
