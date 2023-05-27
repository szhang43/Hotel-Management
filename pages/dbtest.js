import React from 'react';
import { db } from '@/firebase/initFirebase'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getAvailRoomsDB } from '@/firebase/firebaseUtils';


const ReadDataFromCloudFirestore = async () => {
        // const availRooms = await getAvailRoomsDB('test','test')
        // console.log(availRooms)
        const uid = "r4Cy4DpV3jTvwUjLzDMQ0Vq6vNA2"

        await getDoc(doc(db, "HTM2", "Hotel Info", "Customer", uid))
        .then((doc) => {
            if(doc.exists()){
                console.log(doc.data())
            } else {
                console.log("No such document exists");
            }
        })
}



const dbtest = () => {
    return (
        <div>
            <h1>dbtest</h1>
            <button onClick={ReadDataFromCloudFirestore}>Read Data From Cloud Firestore</button>
        </div>
    );
}

export default dbtest