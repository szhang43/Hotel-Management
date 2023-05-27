import { db } from "./initFirebase"
import { doc, collection, getDoc, getDocs, setDoc, addDoc } from "firebase/firestore";

const readDB = async (locArr) => {
    try {
        const userDoc = doc(db, ...locArr)
        return await getDoc(userDoc).then((doc) => {
            if(doc.exists()){
                return doc.data()
            } else {
                console.log("No such document exists");
                return null
            }
        })
    } catch (error) {
        alert("Error reading from database, check console")
        console.log("Error getting document:", error);
    }
}


const getAvailRoomsDB = async (checkInDate, checkOutDate) => {
    const locArr = ["HTM2", "Hotel Info"]
    let totalRooms = await readDB(locArr).then((data) => {
        return {large: data["Room Inventory"].large, medium: data["Room Inventory"].medium, small: data["Room Inventory"].small}
    })
    console.log(totalRooms);

    const querySnapshot = await getDocs(collection(db, "HTM2", "Hotel Info", "Reservations"));
    querySnapshot.forEach((doc) => {
        if (
            // check in date between bookedFrom and bookedTo
            new Date(checkInDate) < new Date(doc.data().bookedTo) &&
            new Date(checkInDate) >= new Date(doc.data().bookedFrom) || 
            // check out date between bookedFrom and bookedTo
            new Date(checkOutDate) > new Date(doc.data().bookedFrom) &&
            new Date(checkOutDate) <= new Date(doc.data().bookedTo)
            ){
                totalRooms[doc.data().roomSize] -= 1
        }
    })

    // TODO: check rooms for maintenance

    return totalRooms

}


const writeUserDB = async (userData) => {
    // console.log(userData);
    const locArr = ["HTM2", "Hotel Info", "Profile"]
    await setDoc(doc(db, ...locArr, userData.uid), userData)
}


const bookRoomDB = async (userData, resData) => {
    const customer = {
        "Customer Info": {
            customerId: userData.uid,
            fName: userData.fName,
            lName: userData.lName,
        },
        "Reservation Info": {
            dateIn: resData.dateIn,
            dateOut: resData.dateOut,
            roomSize: resData.roomSize,
        }
    }

    const reservation = {
        bookedBy: userData.uid,
        bookedFrom: resData.dateIn,
        bookedTo: resData.dateOut,
        roomSize: resData.roomSize
    }

    
    //add reservation to reservations collection and keep doc id
    await addDoc(collection(db, "HTM2", "Hotel Info", "Reservations"), reservation)
    .then( async (docRef) => {
        console.log("Document written with ID: ", docRef.id);

        //check if customer doc exists  
        await getDoc(doc(db, "HTM2", "Hotel Info", "Customer", userData.uid))
        .then( async (docSnap) => {

            //if not, create it
            if(!docSnap.exists()){
                await setDoc(doc(db, "HTM2", "Hotel Info", "Customer", userData.uid), customer)
            } 
        })

        //add reservation to customer doc collection with DOC ID OF RESERVATION
        await setDoc(doc(db, "HTM2", "Hotel Info", "Customer", userData.uid, "Reservations", docRef.id), reservation)
    })
}   



export { getAvailRoomsDB, writeUserDB, bookRoomDB }