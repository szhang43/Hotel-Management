import React, { useState, useEffect } from 'react';
import { getMsgsDB, deleteMsgDB } from '@/firebase/firebaseUtils';
import styles from '@/styles/Admin.module.css';

const MessageForm = () => {
    const [messages, setMessages] = useState([])


    const updateMsgs = () => {
        getMsgsDB()
        .then((data) => {
            setMessages(data)
        })
    }

    useEffect(() => {
        updateMsgs()
    }, [])


    const removeMaintenance = (msgId) => {
        console.log(msgId);
        deleteMsgDB(msgId)
        .then(() => {
            updateMsgs()
        })
    }


    return (
        <form>
            <div className={styles.containertwo}>
                <h3 className={styles.titleline}>Unread Messages</h3>
                {messages.length > 0 ? (
                    <ul> 
                        {messages.map((item) => {
                            return (
                                <li key={item.msgId} className={styles.details}>
                                    <p>Name: {item.name}</p>
                                    <p>Phone: {item.phone}</p>
                                    <p>Email: {item.email}</p>
                                    <p>Message: <strong>{item.message}</strong></p>
                                    <p>Date Submitted: {item.date}</p>

                                    <button className={styles.MaintButton} onClick={(e) => {
                                        e.preventDefault()
                                        removeMaintenance(item.msgId)
                                    }}>Delete Message</button>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p>No messages</p>
                )}
            </div>
        </form>
    )
}

export default MessageForm
