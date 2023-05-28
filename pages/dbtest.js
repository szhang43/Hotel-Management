import React, {useState} from 'react';
import { db } from '@/firebase/initFirebase'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getAllProfileDB, listAllResDB, getAllCustDB } from '@/firebase/firebaseUtils';


const DBtest = () => {
    const [allRes, setAllRes] = useState([])
    const [allProfileIds, setAllProfileIds] = useState([])
    const [allCustIds, setAllCustIds] = useState([])

    const listAllRes = async () => {
        setAllRes(await listAllResDB())
    }

    const listAllProfileIds = async () => {
        setAllProfileIds(await getAllProfileDB())
    }

    const listAllCustIds = async () => {
        setAllCustIds(await getAllCustDB())
    }

    return (
        <div>
            <h1>dbtest</h1>

            <button onClick={listAllRes}>List all Reservations</button>
            <ul>{
                allRes.map((res) => (
                    <li key={res.resId}>Reservation ID: {res.resId} <br></br> Status: {res.status} <br></br> Room Size: {res.roomSize} <br></br> Check In: {res.bookedFrom} <br></br> Check Out: {res.bookedTo}</li>
                ))
            }</ul>

            <button onClick={listAllProfileIds}>List all Profile IDs</button>
            <ul>{
                allProfileIds.map((id) => (
                    <li key={id}>{id}</li>
                ))
            }</ul>

            <button onClick={listAllCustIds}>List all Customer IDs</button>
            <ul>{
                allCustIds.map((cust) => (
                    <li key={cust.customerId}>First Name: {cust.fName} <br></br> Last Name: {cust.lName} <br></br> ID: {cust.customerId}</li>
                ))
            }</ul>

        </div>
    );
}

export default DBtest