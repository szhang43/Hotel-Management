/*
    filename: ChangeRoomPrice.js
    description: This file contains the component that displays the current room prices and
        allows an admin to change them.
*/

import React, { useState, useEffect } from 'react';
import { getRoomPricesDB, setRoomPriceDB } from '@/firebase/firebaseUtils';
import styles from '@/styles/Admin.module.css';



const ChangeRoomPrice = () => {
    const [roomPrices, setRoomPrices] = useState({large: 0, medium: 0, small: 0})
    const [size, setSize] = useState("");
    const [input, setInput] = useState("");

    const updateRoomPrices = () => {
        getRoomPricesDB()
            .then((data) => {
                setRoomPrices(data)
        })
    }

    useEffect(() => {
        updateRoomPrices()
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

        setRoomPriceDB(size, num)
        .then(() => {
            updateRoomPrices()
        })
    }

    return (
        <form>
            <div className={styles.container}>
            <h3 className={styles.currPrice}>Current Prices:</h3>
                <ul>
                    <li>Large Rooms: ${roomPrices.large}</li>
                    <li>Medium Rooms: ${roomPrices.medium}</li>
                    <li>Small Rooms: ${roomPrices.small}</li>
                </ul>

                <h3 className={styles.updatePrice}>Update Room Prices</h3>
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



                <input type="number" min="10" step="10"
                placeholder="Enter Price" 
                onChange={e=>setInput(e.target.value)}
                />

                <button className={styles.button} value={"add"} onClick={handleSubmit}>Set Price</button>
            </div>
        </form>
    );
}

export default ChangeRoomPrice;