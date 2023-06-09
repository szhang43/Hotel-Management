/* 
    filename: ResSuccess.js
    description: This page is shown to the user when a reservation is successfully made
*/

import React from "react";
import styles from '@/styles/ResBooked.module.css';

function ReservationBooked(){
    return(
        <div className={styles.background}>
            <div className={styles.success}>
                <img src="/img/confirm-icon.png" alt="confirm" className={styles.confirm} />
                <h1 className={styles.confirmed}>Confirmed!</h1>
                <p>Your reservation has been successfully Booked
                View your user profile to see additional details.
                </p>
            </div>
        </div>
    );
};

export default ReservationBooked