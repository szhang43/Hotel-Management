import { db } from "./initFirebase"
import { doc, collection, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

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
    const custIn = new Date(checkInDate)
    const custOut = new Date(checkOutDate)

    const querySnapshot = await getDocs(collection(db, "HTM2", "Hotel Info", "Reservations"));
    querySnapshot.forEach((doc) => {
        const roomIn = new Date(doc.data().bookedFrom)
        const roomOut = new Date(doc.data().bookedTo)
        if (
            // check in date between bookedFrom and bookedTo
            custIn < roomOut &&
            custIn >= roomIn || 
            // check out date between bookedFrom and bookedTo
            custOut > roomIn &&
            custOut <= roomOut ||

            custIn <= roomIn &&
            custOut >= roomOut

            ){
                totalRooms[doc.data().roomSize] -= 1
        }
    })

    // Remove rooms that need maintenance
    const maintSnapshot = await getDocs(collection(db, "HTM2", "Hotel Info", "Work Order"));
    maintSnapshot.forEach((doc) => {
        totalRooms[doc.data().roomSize] -= 1
    })

    return totalRooms

}


const writeUserDB = async (userData) => {
    // console.log(userData);
    const locArr = ["HTM2", "Hotel Info", "Profile"]
    await setDoc(doc(db, ...locArr, userData.uid), userData)
}


const bookRoomDB = async (userData, resData) => {
    const customer = {
        customerId: userData.uid,
        fName: userData.fName,
        lName: userData.lName,
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
        // set resId to docRef
        await updateDoc(doc(db, "HTM2", "Hotel Info", "Reservations", docRef.id), {resId: docRef.id})

        //check if customer doc exists  
        await getDoc(doc(db, "HTM2", "Hotel Info", "Customer", userData.uid))
        .then( async (docSnap) => {

            //if not, create it
            if(!docSnap.exists()){
                await setDoc(doc(db, "HTM2", "Hotel Info", "Customer", userData.uid), customer)
            } 
        })

        //add reservation to customer doc collection with DOC ID OF RESERVATION
        await setDoc(doc(db, "HTM2", "Hotel Info", "Customer", userData.uid, "Reservations", docRef.id), {
            ...reservation,
            resId: docRef.id
        })
    })
}  




const deleteResDB = async (resId, userId) => {
    // delete res doc from res collection
    const resDoc = doc(db, "HTM2", "Hotel Info", "Reservations", resId)
    const docSnap = await getDoc(resDoc)
    if(docSnap.exists()){
        await deleteDoc(resDoc);
    } else {
        console.log("Reservation doc does not exist");
    }

    // delete res doc in customer reservations collection
    const customerResDoc = doc(db, "HTM2", "Hotel Info", "Customer", userId, "Reservations", resId)
    const customerResDocSnap = await getDoc(customerResDoc)
    if(customerResDocSnap.exists()){
        await deleteDoc(customerResDoc);
    } else {
        console.log("Customer reservation doc does not exist");
    }
}


const getAllProfileDB = async () => {
    let allUserId = []
    const profileSnap = await getDocs(collection(db, "HTM2", "Hotel Info", "Profile"));
    profileSnap.forEach((doc) => {
        allUserId.push(doc.get("uid"))
    })
    console.log(allUserId);
    return allUserId
}

const getAllCustDB = async () => {
    let allCustId = []
    const profileSnap = await getDocs(collection(db, "HTM2", "Hotel Info", "Customer"));
    profileSnap.forEach((doc) => {
        allCustId.push(doc.data())
    })
    console.log(allCustId);
    return allCustId
}


const listAllResDB = async () => {
    let allRes = []

    const resSnap = await getDocs(collection(db, "HTM2", "Hotel Info", "Reservations"));
    resSnap.forEach((doc) => {
        allRes.push(doc.data())
    })

    return allRes
}


const getRoomPricesDB = async () => {
    const dbSnap = await getDoc(doc(db, "HTM2", "Hotel Info"));
    let roomPrices = dbSnap.get("Room Price")
    
    return roomPrices
}

const setNumRoomDB = async (roomSize, numRooms) => {
    const docSnap = await getDoc(doc(db, "HTM2", "Hotel Info"))
    let sizes = docSnap.data()["Room Inventory"]

    sizes[roomSize] += Number.parseInt(numRooms)
    await updateDoc(doc(db, "HTM2", "Hotel Info"), {"Room Inventory": sizes})
}

const setRoomPriceDB = async (roomSize, price) => {
    const docSnap = await getDoc(doc(db, "HTM2", "Hotel Info"))
    let prices = docSnap.data()["Room Price"]

    prices[roomSize] = Number.parseInt(price)
    await updateDoc(doc(db, "HTM2", "Hotel Info"), {"Room Price": prices})
}

const addMaintenanceDB = async (roomSize, roomId, mReason) => {
    const dateToday = new Date().toLocaleDateString('fr-ca')

    const docRef = await addDoc(collection(db, "HTM2", "Hotel Info", "Work Order"), {
        roomSize: roomSize,
        roomId: roomId,
        description: mReason,
        date: dateToday,
    })

    await updateDoc(doc(db, "HTM2", "Hotel Info", "Work Order", docRef.id), {maintId: docRef.id})
}

const getMaintenanceDB = async () => {
    let allMaintenance = []

    const mSnap = await getDocs(collection(db, "HTM2", "Hotel Info", "Work Order"));
    mSnap.forEach((doc) => {
        allMaintenance.push(doc.data())
    })

    return allMaintenance
}

const removeMaintenanceDB = async (maintId) => {
    const docSnap = await getDoc(doc(db, "HTM2", "Hotel Info", "Work Order", maintId))
    if(docSnap.exists()){
        await deleteDoc(doc(db, "HTM2", "Hotel Info", "Work Order", maintId));
    } else {
        console.log("Maintenance doc does not exist");
    }
}



export {
    getAvailRoomsDB,
    writeUserDB,
    bookRoomDB,
    deleteResDB,
    listAllResDB,
    getAllProfileDB,
    getAllCustDB,
    getRoomPricesDB,
    setNumRoomDB,
    setRoomPriceDB,
    addMaintenanceDB,
    getMaintenanceDB,
    removeMaintenanceDB
}