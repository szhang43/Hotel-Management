import React from 'react';
import styles from '@/styles/Admin.module.css';
import ChangeNumRooms from '@/components/ChangeNumRooms.js';

const Admin = () => {


  return (
    <div>
      <div className={styles.adminBack}>
        <ChangeNumRooms/>

      </div>
    </div>
  );
};

export default Admin;
