import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '@/components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      {/* <ResSuccess/> */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
