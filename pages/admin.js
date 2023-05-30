import React from 'react';
import AddForm from '../components/AddInventory.js';
import RemoveForm from '../components/RemoveInventory.js';
import styles from '@/styles/Admin.module.css';

const Admin = () => {
  return (
    <div>
      <div className={styles.adminBack}>
        <AddForm />
        <RemoveForm />
      </div>
    </div>
  );
};

export default Admin;
