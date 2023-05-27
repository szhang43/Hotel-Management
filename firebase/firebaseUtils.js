import { db } from "./initFirebase"
import { doc, collection, getDoc, getDocs, setDoc } from "firebase/firestore";

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
    // make customer doc in customer collection
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
    let locArr = ["HTM2", "Hotel Info", "Customer"]
    await setDoc(doc(db, ...locArr, userData.uid), customer)

    // make reservation doc in reservations collection
    const reservation = {
        bookedBy: userData.uid,
        bookedFrom: resData.dateIn,
        bookedTo: resData.dateOut,
        roomSize: resData.roomSize
    }

    locArr = ["HTM2", "Hotel Info", "Reservations"]
    await setDoc(doc(db, ...locArr, userData.uid), reservation)
}   



export { getAvailRoomsDB, writeUserDB, bookRoomDB }