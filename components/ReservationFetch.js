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

        const resRef = collection(db, "HTM2", "Hotel Info", "Reservations");
        const q = query(resRef, where("bookedBy", "==", userId));
        const snapshot = await getDocs(q);

        const reservationsData = [];
        snapshot.forEach((doc) => {
          const reservation = doc.data();
          reservationsData.push(reservation);
        });

        setReservations(reservationsData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);


  const cancelRes = async (resId) => {
    await deleteResDB(resId, auth.currentUser.uid);
    alert(`Reservation with ID "${resId}" has been cancelled`)
    Router.reload();
  }

  return (
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
      ) : (
        <p>You currently have no reservations.</p>
      )}
    </div>
  );
}

export default Reservation;
