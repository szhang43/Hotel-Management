import React from 'react';
import styles from '@/styles/Index.module.css';
import Map from '../components/Map';
<<<<<<< HEAD
import Image from 'next/image'
import homePic from '../public/img/home.jpg';

=======
import Footer from '../components/Footer'
>>>>>>> bf47a41f43edc7aada9899854b355640022ab124

const DuckNest = () => {
    const address = '1585 East 13th Avenue, Eugene, OR';
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Duck&apos;s Nest</h1>
            <hr />

            <div className={styles.imagecontainer}>
                <Image src={homePic} alt="Beach" width={2024} height={768} />
                <h1 className={styles.header}>Welcome</h1>
            </div>

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
                        <button type="submit">Search</button>
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
