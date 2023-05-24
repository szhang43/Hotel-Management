import React from 'react';
import { useRouter } from 'next/router';

const AboutPage = () => {
    const router = useRouter();
    const {checkInDate, checkOutDate} = router.query;
    console.log(checkOutDate);
    return (
        <div>
        <h1>Bookings</h1>
        <p>checkIn: {checkInDate}</p>
        <p>checkOut: {checkOutDate}</p>
        {/* Add your about content here */}
        </div>
    );
};

export default AboutPage;
