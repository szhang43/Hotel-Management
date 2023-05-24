import React from 'react';
import styles from '@/styles/Index.module.css';
import Map from '../components/Map';
import { useRouter } from 'next/router';


const DuckNest = () => {
    const router = useRouter();

    const dateToday = new Date().toLocaleDateString('fr-ca')
    const [checkInDate, setCheckInDate] = React.useState(dateToday);
    const [checkOutDate, setCheckOutDate] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push({
            pathname: "/reservation",
            query: {checkInDate: checkInDate, checkOutDate: checkOutDate}
        });
    }

    const address = '1585 East 13th Avenue, Eugene, OR';
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Duck&apos;s Nest</h1>
            <hr />

            <div className={styles.formBox}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                    <div className={styles.label}>Check-in Date:</div>
                        <div className={styles.inputWrapper}>
                            <input type="date" id="checkInDate" required className={styles.input} min={dateToday} onChange={e => {
                                if (e.currentTarget.value > checkOutDate) {
                                    setCheckOutDate(e.currentTarget.value)
                                }
                                setCheckInDate(e.currentTarget.value)
                                }} />
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                    <div className={styles.label}>Check-out Date:</div>
                        <div className={styles.inputWrapper}>
                            <input type="date" id="checkOutDate" required className={styles.input} min={checkInDate} value={checkOutDate} onChange={e => {setCheckOutDate(e.currentTarget.value)}}/>
                        </div>
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type='submit'>Search</button>
                    </div>
                </form>
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
                    <h2>Contact</h2>
                    <div className={styles.contactInfo}>
                        {/* Add your contact information or placeholder here */}
                        <p>+1-800-DUCKS</p>
                        <p>contact@ducksnest.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DuckNest;
