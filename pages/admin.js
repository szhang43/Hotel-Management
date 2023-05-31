import React from 'react';
import styles from '@/styles/Admin.module.css';
import ChangeNumRooms from '@/components/ChangeNumRooms';
import ChangeRoomPrice from '@/components/ChangeRoomPrice';
import MaintenanceForm from '@/components/MaintenanceForm';


const Admin = () => {


  return (
    <div>
      <div className={styles.adminBack}>
        <ChangeNumRooms/>
        <ChangeRoomPrice/>
        <MaintenanceForm/>
      </div>
    </div>
  );
};

export default Admin;
