import React, { useEffect, useState } from 'react';
import styles from '@/styles/Admin.module.css';
import ChangeNumRooms from '@/components/ChangeNumRooms';
import ChangeRoomPrice from '@/components/ChangeRoomPrice';
import MaintenanceForm from '@/components/MaintenanceForm';
import MessageForm from '@/components/MessageForm';
import { getAllAdminDB } from '@/firebase/firebaseUtils';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        getAllAdminDB()
        .then((data) => {
            const auth = getAuth();
            const user = auth.currentUser;
            if(user){
                if(data.includes(user.uid)){
                    setIsAdmin(true)
                }
            }
        })
    }, [])

    return (
        <div>
            {isAdmin ? (
                <div className={styles.adminBack}>
                    <ChangeNumRooms/>
                    <ChangeRoomPrice/>
                    <MaintenanceForm/>
                    <MessageForm/>
                </div>
            ) : (
                <h1>You do not have admin priviledges</h1>
            )}
        </div>
    );
};

export default Admin;
