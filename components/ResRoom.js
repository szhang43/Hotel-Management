import React from 'react';
import { bookRoomDB } from '@/firebase/firebaseUtils';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import styles from '@/styles/reservation.module.css';

const ResRoom = (props) => {

    const bookRoom = () => {
        console.log('test');
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            const nameArr = user.displayName.split(" ");

            const userData = {
                fName: nameArr[0],
                lName: nameArr[1],
                uid: user.uid,
            }
            const resData = {
                dateIn: props.checkInDate,
                dateOut: props.checkOutDate,
                roomSize: props.size,
            }

            bookRoomDB(userData, resData)
            .then(() => {
                alert("Room Booked!");
            })
        })
    }


    return (
        <div>
            {/* <h1>{props.size}</h1> */}
            <button className={styles.reserveButton} onClick={bookRoom}>Reserve Room</button>
        </div>
    )
}

export default ResRoom