import React from 'react';
import styles from '@/styles/about.module.css';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <><Image
      className={styles.aboutImage}
      src="/img/abt.png"
      alt="Pool"
      fill />
      
      <div className={styles.container}>

        <div className={styles.aboutTitle}>
          <h1>About Us</h1>
        </div>

        <div className={styles.aboutus}>
          <p>Welcome to Duck&apos;s Nest, the ultimate destination for adventurous souls
            <br />seeking a blend of exotic experiences and luxurious accommodations.<br />

            At Duck&apos;s Nest, we understand the desires of young travelers who crave unique journeys,<br />
            exploring far-flung corners of the world while indulging in the comforts of a splendid hotel.<br />
            <br />
            Our collection of properties offers a harmonious fusion of captivating environments,<br />
            from lush rainforests to serene beaches and awe-inspiring mountains.<br />
            Immerse yourself in the wonders of nature and cultural richness.<br />
            <br />
            Browse through our selection of rooms and book your ideal retreat with just a few clicks.<br />

            Whether you seek a cozy cabin in the wilderness or a luxurious suite overlooking breathtaking landscapes,<br />
            our diverse range of accommodations caters to every taste and preference.<br />

            Let Duck&apos;s Nest be your companion as you create lifelong memories in the world&apos;s most enchanting destinations.<br />
            <br />
            Book your room today and embark on a remarkable experience that will leave you craving for more.</p>
        </div>
      </div></>
  );
};

export default AboutPage;
