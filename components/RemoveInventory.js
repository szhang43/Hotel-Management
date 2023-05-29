import React, {useState} from 'react';
import styles from '../styles/Admin.module.css';

const Admin = () => {

  const[size, setSize] = useState();
  const[quantity, setQuantity] = useState();

  return (

    <form>
      <div className={styles.container}>
        <h3>Remove from the Room Inventory</h3>
        <div>Room Type: <strong>{size}</strong></div>
        <div className={styles.sizeInput}>
          <input name="size" value="Small" type="radio"
          onChange={e=>setSize(e.target.value)}
          />Small

          <input name="size" value="Medium" type="radio"
          onChange={e=>setSize(e.target.value)}
          />Medium

          <input name="size" value="Large" type="radio"
          onChange={e=>setSize(e.target.value)}
          />Large
        </div>
        <input type="number" min="1" step="1"
        placeholder="Quantity of Rooms"
        onChange={e=>setQuantity(e.target.value)}
        />
        <button className={styles.button}>Remove Rooms</button>
      </div>
    </form>
  );
};

export default Admin;
