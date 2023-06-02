import React, { useState, useEffect } from 'react';
import { addMaintenanceDB, getMaintenanceDB, removeMaintenanceDB } from '@/firebase/firebaseUtils';
import styles from '@/styles/Admin.module.css';

const MaintenanceForm = () => {
    const [size, setSize] = useState("");
    const [reason, setReason] = useState("");
    const [roomId, setRoomId] = useState("");
    const [maintenance, setMaintenance] = useState([])

    const updateMaintenance = () => {
        getMaintenanceDB()
        .then((data) => {
            setMaintenance(data)
        })
    }

    useEffect(() => {
        updateMaintenance()
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault()

        if (size === "" || reason === "" || roomId === "") {
            alert("Please fill out all fields")
            return
        }

        addMaintenanceDB(size, roomId, reason)
        .then(() => {
            updateMaintenance()
        })
    }

    const removeMaintenance = (maintId) => {
        console.log(maintId);
        removeMaintenanceDB(maintId)
        .then(() => {
            updateMaintenance()
        })
    }


    return (
        <form>
            <div className={styles.container}>


                <h3 className={styles.makeReq}>Make Maintenance Request</h3>
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



                <input type="text" placeholder="Enter Reason" onChange={e=>setReason(e.target.value)}/>
                <input type="text" placeholder="Enter Room ID" onChange={e=>setRoomId(e.target.value)}/>

                <button className={styles.button} onClick={handleSubmit}>Send Request</button>
            </div>

            <div className={styles.containertwo}>
                <h3 className={styles.titleline}>Current Maintenance Requests</h3>
                 <ul>
                    {maintenance.map((item) => {
                        return (
                            <li key={item.maintId} className={styles.details}>
                                <p>Room Type: {item.roomSize}</p>
                                 <p>Room ID: {item.roomId}</p>
                                 <p>Maintenance ID: {item.maintId}</p>
                                <p>Reason: {item.description}</p>
                                <p>Date Submitted: {item.date}</p>
                                <button className={styles.MaintButton} onClick={(e) => {
                                    e.preventDefault()
                                    removeMaintenance(item.maintId)
                                }}>Remove Request</button>
                            </li>
                        )
                    })}
                </ul>
            </div>


        </form>
    )
}

export default MaintenanceForm
