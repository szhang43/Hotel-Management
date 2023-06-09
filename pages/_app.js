/* 
    filename: _app.js
    description: Defines the layout of each page of the app
*/

import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '@/components/Footer';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
