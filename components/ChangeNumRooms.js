import React, { useState, useEffect } from 'react';
import { getAvailRoomsDB, setNumRoomDB } from '@/firebase/firebaseUtils';
import styles from '@/styles/Admin.module.css';



const ChangeNumRooms = (props) => {
    const [availRooms, setAvailRooms] = useState({large: 0, medium: 0, small: 0})
    const [size, setSize] = useState();
    const [input, setInput] = useState();

    const updateAvailRooms = () => {
        getAvailRoomsDB(null, null)
        .then((data) => {
            console.log(data)
            setAvailRooms(data)
        })
    }

    useEffect(() => {
        updateAvailRooms()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        let num = parseInt(input)
        if (e.target.value === "remove") {
            num = num * -1
        }
        console.log(num);
        setNumRoomDB(size, num)
        .then(() => {
            updateAvailRooms()

        })
    }

    return (
        <form>
            <div className={styles.container}>
            <p>Current Inventory:</p>
                <ul>
                    <li>Large Rooms: {availRooms.large}</li>
                    <li>Medium Rooms: {availRooms.medium}</li>
                    <li>Small Rooms: {availRooms.small}</li>
                </ul>

                <h3>Update Room Inventory</h3>
                <div>Room Type: <strong>{size}</strong></div>

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

                <button className={styles.button} value={"add"} onClick={handleSubmit}>Add Rooms</button>
                <button className={styles.button} value={"remove"} onClick={handleSubmit}>Remove Rooms</button>
            </div>
        </form>
    );
}

export default ChangeNumRooms;