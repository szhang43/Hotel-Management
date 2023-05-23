import React from 'react';
import styles from '@/styles/Index.module.css';
import Map from '../components/Map';

const DuckNest = () => {
    const address = '1585 East 13th Avenue, Eugene, OR';
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Duck&apos;s Nest</h1>
            <hr />

            <div className={styles.formBox}>
                <form className={styles.form}>
                    <div className={styles.inputContainer}>
                        <div className={styles.label}>Check-in Date:</div>
                        <input type="date" id="checkInDate" className={styles.input} />
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.label}>Check-out Date:</div>
                        <input type="date" id="checkOutDate" className={styles.input} />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type="submit">Book Now</button>
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
