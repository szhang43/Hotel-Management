import React from 'react';
import { useRouter } from 'next/router';
import ResRoom from '@/components/ResRoom';
import styles from '@/styles/reservation.module.css';
import { useState, useEffect } from 'react';
import { getAvailRoomsDB } from '@/firebase/firebaseUtils';


const Reservation = () => {
    useEffect(() => {
        updateAvailRooms()
    }, [])

    const router = useRouter();
    const {checkInDate, checkOutDate} = router.query;
    const [availRooms, setAvailRooms] = useState({large: 0, medium: 0, small: 0})

    const updateAvailRooms = () => {
        getAvailRoomsDB(checkInDate, checkOutDate)
        .then((data) => {
            console.log(data)
            setAvailRooms(data)
        })
    }

    // const genRooms = (roomSize, numRooms) => {
    //     let rooms = []
    //     for(let i = 0; i < numRooms; i++){
    //         rooms.push(<ResRoom size={roomSize} checkInDate={checkInDate} checkOutDate={checkOutDate} />)
    //     }
    //     return <div className={`${roomSize}Rooms`}>{rooms}</div>
    // }


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

            <div className={styles.roomContainer}>
                <div className={styles.size}>
                    <p>The Cozy | Singles</p>
                    <img src="/img/cozy.jpg" alt="Logo" className={styles.img} />
                    <p>Description:</p>
                    <p>Welcome to our deluxe room, designed to provide a comfortable and enjoyable 
                        stay for one or two guests. Relax in a cozy queen-sized bed and appreciate the 
                        tasteful furnishings that create a soothing atmosphere. The en-suite bathroom
                        offers convenience with modern amenities, including a rain shower and a deep
                        soaking tub. Enjoy the pleasant ambiance of this well-appointed room, where 
                        every detail is thoughtfully arranged to ensure a memorable experience.
                    </p>
                    <p>Rooms Available: {availRooms.small}</p>
                    <p>Price: $</p>
                </div>

                <div className={styles.size}>
                    <img src="/img/deluxe.jpg" alt="Logo" className={styles.img} />
                    <p>Room Deluxe | Family </p>
                    <p>Discover the ultimate in comfort and sophistication within our deluxe room, 
                        thoughtfully designed to accommodate up to four guests. Step into a spacious
                        sanctuary adorned with stylish furnishings and contemporary touches, creating an 
                        atmosphere of relaxation and indulgence. Sink into the plush beds and relish the 
                        ample space available for your entire group to unwind and rejuvenate. With its inviting 
                        ambiance and attention to detail, this exquisite retreat promises a memorable stay where 
                        comfort and elegance intertwine harmoniously.
                    </p>
                    <p>Rooms Available: {availRooms.medium}</p>
                    <p>Price : $$</p>
                </div>

                <div className={styles.size}>
                    <p>Luxury | Group</p>
                    <img src="/img/luxury.jpg" alt="Logo" className={styles.img} />
                    <p>Experience pure luxury in our exquisite room, where elegance meets comfort. Enjoy a king-sized 
                        bed adorned with plush linens for a restful sleep. The spacious en-suite bathroom features marble 
                        accents and indulgent amenities. Immerse yourself in the opulent ambiance of our luxury room and 
                        indulge in an unforgettable stay.
                    </p>
                    <p>Rooms Available: {availRooms.large}</p>
                    <p>Price: $$$ </p>
                </div>
            </div>
{/* 
            <div className={styles.roomGrid} style={{display: "flex", gap: "30px"}}>
                {[
                    genRooms("large", availRooms.large),
                    genRooms("medium", availRooms.medium),
                    genRooms("small", availRooms.small)
                ]}  
            </div> */}
            
        </div>
    );
};

export default Reservation;
