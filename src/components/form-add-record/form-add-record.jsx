import React, {
  useContext,
} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { store } from '@src/store';
import styles from './form-add-record.module.css';

const defaultRecordData = {
  address: {
    streetAddress: 'N\\A',
    city: 'N\\A',
    state: 'N\\A',
    zip: 'N\\A',
  },
  description: 'et lacus magna dolor...',
};

const onFormSubmit = (evt, dispatch) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const fieldNames = ['id', 'firstName', 'lastName', 'email', 'phone'];
  const newRecordData = fieldNames
    .reduce((acc, fieldName) => ({
      ...acc,
      [fieldName]: formData.get(`input-${fieldName}`),
    }), defaultRecordData);

  dispatch({
    type: 'ADD_NEW.ADD',
    payload: newRecordData,
  });
};

const FormAddRecord = () => {
  const globalState = useContext(store);

  const { dispatch } = globalState;

  return (
    <Form
      className={styles.form}
      onSubmit={(evt) => { onFormSubmit(evt, dispatch); }}
    >
      <div className={styles.inner}>
        <Form.Group className={styles.field} controlId="input-id">
          <Form.Label>id</Form.Label>
          <Form.Control
            name="input-id"
            className={styles['input-id']}
            type="number"
            placeholder="Идентификатор"
            required
          />
        </Form.Group>

        <Form.Group className={styles.field} controlId="input-firstname">
          <Form.Label>firstName</Form.Label>
          <Form.Control
            name="input-firstName"
            type="text"
            placeholder="Имя"
            required
          />
        </Form.Group>

        <Form.Group className={styles.field} controlId="input-lastname">
          <Form.Label>lastname</Form.Label>
          <Form.Control
            name="input-lastName"
            type="text"
            placeholder="Фамилия"
            required
          />
        </Form.Group>

        <Form.Group className={styles.field} controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <Form.Control
            name="input-email"
            type="email"
            placeholder="Электронная почта"
            required
          />
        </Form.Group>

        <Form.Group className={styles.field} controlId="formBasicEmail">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="input-phone"
            type="text"
            placeholder="Номер телефона"
            required
          />
        </Form.Group>
      </div>

      <Button variant="primary" type="submit">
        Добавить
      </Button>
    </Form>
  );
};

export default FormAddRecord;
