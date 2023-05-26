import React from 'react';
import { db } from '@/firebase/initFirebase'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getAvailRooms } from '@/firebase/firebaseUtils';

// const ReadDataFromCloudFirestore = async () => {
//     try {
//         const userDoc = doc(db, "testCollection", "testDoc")
//         await getDoc(userDoc).then((doc) => {
//             if (doc.exists()) {
//                 console.log(doc.data())
//             } else {
//                 console.log("No such document!");
//             }
//         })
//         alert('Data successfully fetched, check console')
//     } catch (error) {
//         console.log(error)
//         alert(error)
//     }
// }

// const writeToFirestore = async () => {
//     try {
//         await updateDoc(doc(db, "testCollection", "testDoc"), {
//             name: "John Doe"
//         })
//     } catch (error) {
//         console.log(error);
//         alert(error)
//     }
// }

const ReadDataFromCloudFirestore = async () => {
        const availRooms = await getAvailRooms()
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