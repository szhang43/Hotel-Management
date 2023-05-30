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

    const genRooms = (roomSize, numRooms) => {
        let rooms = []
        for(let i = 0; i < numRooms; i++){
            rooms.push(<ResRoom size={roomSize} checkInDate={checkInDate} checkOutDate={checkOutDate} />)
        }
        return <div className={`${roomSize}Rooms`}>{rooms}</div>
    }


    return (
      <div>
        <div className={styles.gradient}>
          <div className={styles.background}>
              <div className={styles.reservationTitle}>
                <h1>Reservations</h1> {/* Move the "Reservations" heading into the background */}
              </div>
              <div className={styles.dateInfo}>
                <p className={styles.dates}>
                  You selected the following dates for your stay:
                  <br />
                  Check In: {checkInDate} <br /> Check Out: {checkOutDate}
                </p>
              </div>
          </div>
      
          <div className={styles.container}>
            <div className={styles.text}>
              <p>
                We&apos;re delighted to help you find the perfect room and making your
                stay at our hotel a delightful experience. Whether you&apos;re seeking a
                cozy nest for a solo adventure
                <br />
                or a spacious haven for a family getaway, we have just the right room
                waiting for you.
                <br />
                Take your time, explore our options, and imagine the tranquil ambiance
                and stunning views that await. Go ahead and find the room that speaks to
                your heart,
                <br />
                and let us create wonderful memories during your stay at Duck&apos;s Nest.
              </p>
            </div>
      
              {/* These can be deleted unless we want to keep them */}
              {/* <p>Available Large Rooms: {availRooms.large}</p>
              <p>Available Medium Rooms: {availRooms.medium}</p>
              <p>Available Small Rooms: {availRooms.small}</p> */}
      
              <div className={styles.roomContainer}>
                <div className={styles.size}>
                  <h1>The Cozy | Singles</h1>
                  <img src="/img/cozy.jpg" alt="Logo" className={styles.img} />
                  <p>
                    Welcome to our cozy room, designed to provide a comfortable and
                    enjoyable stay for one or two guests. Relax in a cozy queen-sized
                    bed and appreciate the tasteful furnishings that create a soothing
                    atmosphere. The en-suite bathroom offers convenience with modern
                    amenities, including a rain shower and a deep soaking tub. Enjoy
                    the pleasant ambiance of this well-appointed room, where every
                    detail is thoughtfully arranged to ensure a memorable experience.
                  </p>
                  <p>Rooms Available: {availRooms.small}</p>
                  <p>Price: $</p>
                  <ResRoom
                    size={"small"}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                </div>
      
                <div className={styles.size}>
                  <h1>Room Deluxe | Family </h1>
                  <img src="/img/deluxe.jpg" alt="Logo" className={styles.img} />
                  <p>
                    Discover the ultimate in comfort and sophistication within our
                    deluxe room, thoughtfully designed to accommodate up to four
                    guests. Step into a spacious sanctuary adorned with stylish
                    furnishings and contemporary touches, creating an atmosphere of
                    relaxation and indulgence. Sink into the plush beds and relish the
                    ample space available for your entire group to unwind and
                    rejuvenate. With its inviting ambiance and attention to detail,
                    this exquisite retreat promises a memorable stay where comfort and
                    elegance intertwine harmoniously.
                  </p>
                  <p>Rooms Available: {availRooms.medium}</p>
                  <p>Price : $$</p>
                  <ResRoom
                    size={"medium"}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                </div>
      
                <div className={styles.size}>
                  <h1>Luxury | Group</h1>
                  <img src="/img/luxury.jpg" alt="Logo" className={styles.img} />
                  <p>
                    Experience pure luxury in our exquisite room, where elegance meets
                    comfort. Enjoy a king-sized bed adorned with plush linens for a
                    restful sleep. The spacious en-suite bathroom features marble
                    accents and indulgent amenities. Immerse yourself in the opulent
                    ambiance of our luxury room and indulge in an unforgettable stay.
                  </p>
                  <p>Rooms Available: {availRooms.large}</p>
                  <p>Price: $$$ </p>
                  <ResRoom
                    size={"large"}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                </div>
              </div>
          </div>
        </div>
       </div> 
      );
    };
    
    export default Reservation;