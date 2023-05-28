import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase/initFirebase"; // Assuming you have initialized Firebase with the "db" instance
import {collection, query, where, getDocs } from "firebase/firestore";

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

  return (
    <div>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              Reservation ID: {reservation.resId} | Status: {reservation.status} | Room Size: {reservation.roomSize} | Check In: {reservation.bookedFrom} | Check Out: {reservation.bookedTo}
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
