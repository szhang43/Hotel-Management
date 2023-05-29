import React, { useEffect, useState } from 'react';
import styles from '@/styles/Index.module.css';
import Map from '@/components/Map';
import { useRouter } from 'next/router';
import { getAvailRoomsDB } from '@/firebase/firebaseUtils';


const DuckNest = () => {
    const router = useRouter();
    const address = '1585 East 13th Avenue, Eugene, OR';

    const dateToday = new Date().toLocaleDateString('fr-ca')
    const [checkInDate, setCheckInDate] = React.useState(dateToday);
    const [checkOutDate, setCheckOutDate] = React.useState("");
    const [availRooms, setAvailRooms] = useState({large: 0, medium: 0, small: 0})
    /*const [name, setName] = useState();
    const [email, setEmail] = useState();*/

    useEffect(() => {
        const updateAvailRooms = () => {
            getAvailRoomsDB(checkInDate, checkOutDate)
            .then((data) => {
                console.log(data)
                setAvailRooms(data)
            })
        }

        updateAvailRooms()
    }, [checkInDate, checkOutDate])



    const handleSubmit = (e) => {
        e.preventDefault();
        router.push({
            pathname: "/reservation",
            query: {checkInDate: checkInDate, checkOutDate: checkOutDate}
        });
    }

    // adds 1 day to given date
    const incrDate = (date) => {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 2);
        return newDate.toLocaleDateString('fr-ca');
    }


    return (
            <div className={styles.container}>
            <div className={styles.background}>
                <h1 className={styles.title}>The Duck&apos;s Nest</h1>
                <h2 className={styles.slogan}>Quack into Comfort</h2>
                <hr />
                </div>
                <div className={styles.formBox}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputContainer}>
                        <div className={styles.label}>Check-in Date:</div>
                        <div className={styles.inputWrapper}>
                        <input type="date" id="checkInDate" required className={styles.input} min={dateToday} onChange={e => {
                            if (e.currentTarget.value >= checkOutDate) {
                                setCheckOutDate(incrDate(e.currentTarget.value))
                            }
                            setCheckInDate(e.currentTarget.value)
                            }
                        }/>
                        </div>
                        </div>
                        <div className={styles.inputContainer}>
                        <div className={styles.label}>Check-out Date:</div>
                        <div className={styles.inputWrapper}>
                            <input type="date" id="checkOutDate" required className={styles.input} min={incrDate(checkInDate)} value={checkOutDate} onChange={e => {
                                setCheckOutDate(e.currentTarget.value)
                            }}/>
                        </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button>Search</button>
                        </div>
                    </form>

                    <div>
                        {checkOutDate ? (
                            <div>
                                <h4>Available Rooms:</h4>
                                    <span>Luxury: {availRooms.large}    |   </span>
                                    <span>Deluxe: {availRooms.medium}    |    </span>
                                    <span>Cozy: {availRooms.small}</span>

                            </div>

                        ) : <p>Select a date range to see availibility</p>}
                    </div>

                </div>

            <div className={styles.contentWrapper}>
                <div className={styles.box}>
                    <h2>Location</h2>
                    <div className={styles.locationInfo}>
                        {/* Add your map location here */}
                        <Map address={address} />
                    </div>
                </div>

                <div className={styles.box}>
                    <h2>Contact Us</h2>
                    <div className={styles.contactInfo}>
                        {/* Add your contact information or placeholder here */}
                        <form>
                          <input name="name" placeholder="Name" type="text" />
                          <input name="email" placeholder="Email" type="email"/>
                          <textarea type="text" placeholder="Your Message"></textarea>
                          <button type="button" class="btn">Send Message</button>
                        </form>
                        {/*<p>+1-800-DUCKS</p>
                        <p>contact@ducksnest.com</p>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DuckNest;
