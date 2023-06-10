/*
Fileanme: ReservationFetch.js
Description: 
The `Reservation` component displays a list of reservations for the logged-in user.
It retrieves the reservations from the database based on the user's UID.
The reservations are fetched and displayed in a list format.
Each reservation includes information such as ID, status, room size, check-in date, and check-out date.
The user can cancel a reservation by clicking the "Cancel Reservation" button.
Upon cancellation, the reservation is deleted from the database.
 */

import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase/initFirebase"; // Assuming you have initialized Firebase with the "db" instance
import {collection, query, where, getDocs } from "firebase/firestore";
import { deleteResDB } from "@/firebase/firebaseUtils";
import Router from "next/router";
import styles from "@/styles/profile.module.css"

function Reservation() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservations for the logged-in user from the database
    async function fetchReservations() {
      try {
        const userId = auth.currentUser.uid; // Get the UID of the currently logged-in user

        //create reference to the Reservation collection in the database
        const resRef = collection(db, "HTM2", "Hotel Info", "Reservations");
        //Create a query to get reservation        
        const q = query(resRef, where("bookedBy", "==", userId)); // check if bookedby matches the current userID
        // Execute the query and retrieve snapshot of matching documents in database
        const snapshot = await getDocs(q);

        const reservationsData = [];
        snapshot.forEach((doc) => {
          const reservation = doc.data();
          reservationsData.push(reservation);
        });
        //set the retrieved reseration in the state
        setReservations(reservationsData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);


  // Canceling a reservation
  const cancelRes = async (resId) => {
    await deleteResDB(resId, auth.currentUser.uid); //delete function to delete from db
    alert(`Reservation with ID "${resId}" has been cancelled`); // send an alert message
    Router.reload(); //reload the page to update reservation information
  }

  return (
    // HTML to display reservation information
    <div>
      {reservations.length > 0 ? (
        <ul >
          {reservations.map((reservation) => (
            <li key={reservation.id} className={styles.reservationBox}>
              <p>Reservation ID: {reservation.resId}</p>
              <p>Status: {reservation.status}</p>
              <p>Room Size: {reservation.roomSize}</p> 
              <p>Check In: {reservation.bookedFrom}</p>
              <p>Check Out: {reservation.bookedTo}</p>
              <button className={styles.cancle} onClick={() => {cancelRes(reservation.resId)}}>Cancel Reservation</button>
              {/* Display other reservation information as needed */}
            </li>
          ))}
        </ul>
      ) : ( // If user has reservations display reservation info, else show no reservation
        <p>You currently have no reservations.</p>
      )}
    </div>
  );
}

export default Reservation;
