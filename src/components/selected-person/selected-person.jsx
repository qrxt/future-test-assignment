import React, {
  useContext,
} from 'react';
import cn from 'classnames';

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
    <section className={styles.person}>
      <h2 className="visually-hidden">
        Информация о пользователе
      </h2>

      <div className={styles['data-wrapper']}>
        <p>
          <span className={styles['username-caption']}>
            Выбран пользователь:
          </span>
          <b className={styles.username}>
            { `${firstName} ${lastName}` }
          </b>
        </p>

        <p>Описание:</p>

        <textarea
          className={styles.description}
          readOnly
          defaultValue={description}
        />

        <dl className={cn(styles.data, 'row')}>
          <dd className={cn(styles['data-key'], 'col-3')}>
            Адрес проживания:
          </dd>
          <dt className="col-9">
            <b>
              { streetAddress }
            </b>
          </dt>

          <dd className={cn(styles['data-key'], 'col-3')}>
            Город:
          </dd>
          <dt className="col-9">
            <b>
              { city }
            </b>
          </dt>

          <dd className={cn(styles['data-key'], 'col-3')}>
            Провинция/штат:
          </dd>
          <dt className="col-9">
            <b>
              { countryState }
            </b>
          </dt>

          <dd className={cn(styles['data-key'], 'col-3')}>
            Индекс:
          </dd>
          <dt className="col-9">
            { zip }
          </dt>
        </dl>
      </div>
    </section>
  );
};

export default SelectedPerson;
