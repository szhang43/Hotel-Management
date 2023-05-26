import React from 'react';
import { useRouter } from 'next/router';
import ResRoom from '@/components/ResRoom';
import styles from '@/styles/reservation.module.css';
import { useState, useEffect } from 'react';
import { getAvailRooms } from '@/firebase/firebaseUtils';


const Reservation = () => {
    useEffect(() => {
        updateAvailRooms()
    }, [])

    const router = useRouter();
    const {checkInDate, checkOutDate} = router.query;
    const [availRooms, setAvailRooms] = useState({large: 0, medium: 0, small: 0})

    const updateAvailRooms = () => {
        getAvailRooms()
        .then((data) => {
            console.log(data)
            setAvailRooms(data)
        })
    }

    const genRooms = (roomSize, numRooms) => {
        let rooms = []
        for(let i = 0; i < numRooms; i++){
            rooms.push(<ResRoom size={roomSize}/>)
        }
        return <div className={`${roomSize}Rooms`}>{rooms}</div>
    }


    return (
        <div className={styles.container}>
            <h1>Reservations</h1>

            <div className={styles.text}>
            <p> We&apos;re delighted to help you find the perfect room and making your stay at our hotel a delightful experience. 
                Whether you&apos;re seeking a cozy nest for a solo adventure<br />
                or a spacious haven for a family getaway, we have just the right room waiting for you.<br />
                Take your time, explore our options, and imagine the tranquil ambiance and stunning views that await.
                Go ahead and find the room that speaks to your heart,<br />
                and let us create wonderful memories during your stay at Duck&apos;s Nest.</p>
            </div>

            <p className={styles.dates}>You selected the following dates for your stay:<br />
            Arrival Date: {checkInDate} <br />  Departure Date: {checkOutDate}</p>

            {/* These can be deleted unless we want to keep them */}
            <p>Available Large Rooms: {availRooms.large}</p>
            <p>Available Medium Rooms: {availRooms.medium}</p>
            <p>Available Small Rooms: {availRooms.small}</p>
            

            <div className={styles.roomGrid} style={{display: "flex", gap: "30px"}}>
                {[
                    genRooms("large", availRooms.large),
                    genRooms("medium", availRooms.medium),
                    genRooms("small", availRooms.small)
                ]}  
            </div>
            
        </div>
    );
};

export default Reservation;
