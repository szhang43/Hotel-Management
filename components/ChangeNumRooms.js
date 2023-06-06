import React, { useState, useEffect } from 'react';
import { getAvailRoomsDB, setNumRoomDB, getTotalRoomsDB } from '@/firebase/firebaseUtils';
import styles from '@/styles/Admin.module.css';



const ChangeNumRooms = (props) => {
    const [availRooms, setAvailRooms] = useState({large: 0, medium: 0, small: 0})
    const [size, setSize] = useState("");
    const [input, setInput] = useState("");

    const updateTotalRooms = () => {
        getTotalRoomsDB()
        .then((data) => {
            console.log(data)
            setAvailRooms(data)
        })
    }

    useEffect(() => {
        updateTotalRooms()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()

        if (size === "" || input === "") {
            alert("Please select a room size and enter a price")
            return
        }

        if (input < 0) {
            alert("Please enter a positive number")
            return
        }

        let num = parseInt(input)
        if (e.target.value === "remove") {
            num = num * -1
        }

        setNumRoomDB(size, num)
        .then(() => {
            updateTotalRooms()
        })
    }

    return (
        <form>
            <div className={styles.container}>
            <h3 className={styles.currInv}>Current Inventory:</h3>
                <ul>
                    <li>Large Rooms: {availRooms.large}</li>
                    <li>Medium Rooms: {availRooms.medium}</li>
                    <li>Small Rooms: {availRooms.small}</li>
                </ul>

                <h3 className={styles.updateRoom}>Update Room Inventory</h3>
                {/* <div>Room Type: <strong>{size}</strong></div> */}

                <div className={styles.sizeInput}>
                    <input name="size" value="small" type="radio"
                    onChange={e=>setSize(e.target.value)}
                    />Small

                    <input name="size" value="medium" type="radio"
                    onChange={e=>setSize(e.target.value)}
                    />Medium

                    <input name="size" value="large" type="radio"
                    onChange={e=>setSize(e.target.value)}
                    />Large
                </div>



                <input type="number" min="1" step="1"
                placeholder="Enter Quantity" 
                onChange={e=>setInput(e.target.value)}
                />

                <button className={styles.button} value={"add"} onClick={handleSubmit}>Add {input && size ? `${input} ${size}` : ""} {input > 1 ? "rooms" : "room"}</button>
                <button className={styles.button} value={"remove"} onClick={handleSubmit}>Remove {input && size ? `${input} ${size}` : ""} {input > 1 ? "rooms" : "room"}</button>
            </div>
        </form>
    );
}

export default ChangeNumRooms;