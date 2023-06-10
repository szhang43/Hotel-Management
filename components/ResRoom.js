/*
    filename: ResRoom.js
    description: This file contains the component that displays the reserve room button
        and handles sending the required information to the checkout page.
*/

import React from 'react';

import { getAuth } from 'firebase/auth';
import styles from '@/styles/reservation.module.css';
import { useRouter } from 'next/router';

const ResRoom = (props) => {
    const router = useRouter();
    
    const bookRoom = () => { // book room function
        const auth = getAuth(); // verify user status
        const user = auth.currentUser;
        
        if(user){ // if user is logged in
            const nameArr = user.displayName.split(" "); // split name to first and last

            const userData = { // store user data with name and uid
                fName: nameArr[0],
                lName: nameArr[1],
                uid: user.uid,
            }
            const resData = { // queried data from selection page 
                dateIn: props.checkInDate,
                dateOut: props.checkOutDate,
                roomSize: props.size,
            }

            
            router.push(  // re-route the page to checkout page 
                {pathname: "/checkout",
                query: {...userData, ...resData, price: props.price} //query data to checkout page
            });
    
        }
        else{
            router.push("/login"); // if user is not logged in, then redirect to login page
        }
    }


    return (
        //reserve room button, when clicked, it will run the bookRoom function
        <div>
            <button className={styles.reserveButton} onClick={bookRoom}>Reserve Room</button>
        </div>
    )
}


export default ResRoom