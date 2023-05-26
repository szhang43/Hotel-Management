import React from 'react';
import { db } from '@/firebase/initFirebase'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getAvailRoomsDB } from '@/firebase/firebaseUtils';


const ReadDataFromCloudFirestore = async () => {
        const availRooms = await getAvailRoomsDB('test','test')
        console.log(availRooms)
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