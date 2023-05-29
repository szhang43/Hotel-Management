import React from "react";
import styles from '@/styles/ResBooked.module.css';

function ReservationBooked(){
    return(
        <div className={styles.success}>
            <img src="/img/confirm.png" alt="confirm" className={styles.confirm} />
            <h1>Confirmed!</h1>
            <p>Your reservation has been successfully Booked
            View your user profile to see additional details.
            </p>
        </div>
    );
};

export default ReservationBooked