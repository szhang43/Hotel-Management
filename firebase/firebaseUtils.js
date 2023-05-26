import { db } from "./initFirebase"
import { doc, getDoc, setDoc } from "firebase/firestore";

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

const getAvailRoomsDB = async () => {
    const locArr = ["Hotel Management", "Hotel Info", "Staff", "gDvR2vocLm0IXvq3woDO", "Room Inventory", "3t8ZhDIhRLOzFHcvr8pv"]

    return await readDB(locArr).then((data) => {
        return {large: data.large, medium: data.medium, small: data.small}
    })
}


const writeUserDB = async (userData) => {
    // console.log(userData);
    const locArr = ["Hotel Management", "Hotel Info", "Customer Info"]

    await setDoc(doc(db, ...locArr, userData.uid), userData)
}

export { getAvailRoomsDB, writeUserDB }