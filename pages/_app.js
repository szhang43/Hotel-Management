import React from 'react';
import NavBar from '../components/Navbar';
import ResSuccess from '../components/ResSuccess';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      {/* <ResSuccess/> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
