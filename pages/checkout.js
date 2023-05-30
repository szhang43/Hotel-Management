import {useEffect, useState} from "react"; 
import Link from 'next/link';
import styles from "@/styles/checkout.module.css"
import { useRouter } from 'next/router';
import ResRoom from '@/components/ResRoom';
import { bookRoomDB } from '@/firebase/firebaseUtils';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function Checkout(){
    const router = useRouter();
    const {dateIn, dateOut, roomSize} = router.query;
    const [displayRoomSize, setDisplayRoomSize] = useState(roomSize);

    useEffect(() => {
        if (roomSize === "large") {
            setDisplayRoomSize("Luxury");
        }
        else if(roomSize === "small") {
            setDisplayRoomSize("The Cozy");
        }
        else if(roomSize === "medium") {
            setDisplayRoomSize("Room Deluxe")
        }
    }, [roomSize]);

    const bookRoom = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        // onAuthStateChanged(auth, (user) => {
        if(user){
            const nameArr = user.displayName.split(" ");

            const userData = {
                fName: nameArr[0],
                lName: nameArr[1],
                uid: user.uid,
            }
            const resData = {
                dateIn: dateIn,
                dateOut: dateOut,
                roomSize: roomSize,
            }
            bookRoomDB(userData, resData)
            .then(() => {
                router.push("/ResSuccess");
            })
        }
        else{
            alert("Reservation was not successfull");
        }
    }


    return(
        <div className={styles.checkout}>
            <p>Reservation Information</p>
            <p>Your selected dates:</p>
            <p>{dateIn} - {dateOut}</p>
            <p>Choosen Room: {displayRoomSize}</p>
            <p>Number of Adults</p>
            <input 
                placeholder="Adult"/>
            <p>Number of Children(age below 18)</p>

            <input
                placeholder="Children"/>
            
            <p>Credit Card Information</p>
            <p>First Name</p>
            <input  
                placeholder="First Name" />
            
            <p>Last Name</p>
            <input 
                placeholder="Last Name" />
            
            <p>Card Number</p>
            <input  
                placeholder="Card Number" />
            
            <p>Security Code</p>
            <input 
                type="password"
                placeholder="CVC"/>
            
            <p>Expiration Date</p>
            <input 
                placeholder="Expiration Date" />
            

            <button onClick={bookRoom}>Confirm</button>
        </div>
    )
}

export default Checkout