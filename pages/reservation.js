import React from 'react';
import { useRouter } from 'next/router';
import ResRoom from '@/components/ResRoom';
import styles from '@/styles/reservation.module.css';


const Reservation = () => {
    const router = useRouter();
    const {checkInDate, checkOutDate} = router.query;

    const getAvailRooms = (roomSize) => {
        // get rooms from database
        const placeholder = 5

        let avail = []
        for (let i = 0; i < placeholder; i++) {
            avail.push(<ResRoom size={roomSize}/>)
        }
        return <div>{avail}</div>
    }

    const genRooms = () => {
        return [
            getAvailRooms("Large"),
            getAvailRooms("Med"),
            getAvailRooms("Small")
        ]
    }


    return (
        <div className={styles.container}>
            <h1>Reservations</h1>

            <div className={styles.text}>
            <p> We're delighted to help you find the perfect room and making your stay at our hotel a delightful experience. 
                Whether you're seeking a cozy nest for a solo adventure<br />
                or a spacious haven for a family getaway, we have just the right room waiting for you.<br />
                Take your time, explore our options, and imagine the tranquil ambiance and stunning views that await.
                Go ahead and find the room that speaks to your heart,<br />
                and let us create wonderful memories during your stay at Duck's Nest.</p>
            </div>

            <p className={styles.dates}>You selected the following dates for your stay:<br />
            Arrival Date: {checkInDate} <br />  Departure Date: {checkOutDate}</p>

            <div className={styles.roomGrid} style={{display: "flex", gap: "30px"}}>
                {genRooms()}  
            </div>
            
        </div>
    );
};

export default Reservation;
