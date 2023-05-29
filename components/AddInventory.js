import React, {useState} from 'react';
import styles from '../styles/Admin.module.css';

const Admin = () => {

  const[size, setSize] = useState();
  const[quantity, setQuantity] = useState();
  const[price, setPrice] = useState();

  return (

    <form>
      <div className={styles.container}>
        <h3>Add to the Room Inventory</h3>
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
        <input type="currency" min="1.00" step="any"
        placeholder="Price of Rooms"
        onChange={e=>setPrice(e.target.value)}
        />
        <button className={styles.button}>Add Rooms</button>
      </div>
    </form>
  );
};

export default Admin;
