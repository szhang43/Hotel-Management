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
        <div className={style.container}>
            <h1>Bookings</h1>
            <p>checkIn: {checkInDate}</p>
            <p>checkOut: {checkOutDate}</p>

            <div style={{display: "flex", gap: "10px"}}>
                {genRooms()}  
            </div>
            
        </div>
    );
};

export default Reservation;
