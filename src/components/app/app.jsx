import React, { useEffect, useState } from 'react';

import PersonService from '@src/services/person-service';
import PersonTable from '@components/person-table';

import styles from './app.module.css';

const App = () => {
  const [peopleData, setPeopleData] = useState([]);

  useEffect(() => {
    const fetchPeopleData = async () => {
      const personService = new PersonService();
      const fetchedPeopleData = await personService
        .getPeopleData();

      setPeopleData(fetchedPeopleData);
    };

    fetchPeopleData();
  }, []);

  return (
    <React.StrictMode>
      <div className={styles.app}>
        <div className={styles['page-wrapper']}>
          <div className={styles.page}>
            <PersonTable peopleList={peopleData} />
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default App;
