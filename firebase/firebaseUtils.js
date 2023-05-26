import { db } from "./initFirebase"
import { doc, getDoc, updateDoc } from "firebase/firestore";

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

const getAvailRooms = async () => {
    const locArr = ["Hotel Management", "Hotel Info", "Staff", "gDvR2vocLm0IXvq3woDO", "Room Inventory", "3t8ZhDIhRLOzFHcvr8pv"]

    return await readDB(locArr).then((data) => {
        return {large: data.large, medium: data.medium, small: data.small}
    })
}

export {getAvailRooms}