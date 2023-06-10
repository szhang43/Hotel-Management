/**
 * Map Component
 * 
 * This component renders a map based on the provided address using the Google Maps API.
 * It loads the necessary Google Maps API and geocodes the address to obtain the map location.
 * 
 */


import { useState, useEffect } from 'react';
import loader from '@/components/googleMapsLoader';

/**
 * Map Component
 * 
 */
const Map = ({ address }) => {
    const [map, setMap] = useState(null);
    useEffect(() => {
      loader.load().then(() => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            const mapOptions = {
              center: results[0].geometry.location,
              zoom: 16,
            };
            const newMap = new window.google.maps.Map(
              document.getElementById('map'),
              mapOptions
            );
            const marker = new window.google.maps.Marker({
              position: results[0].geometry.location,
              map: newMap,
            });
            setMap(newMap);
          }
        });
      });
    }, [address]);
    return <div id="map" style={{ height: '300px', width: '300px' }}></div>;
  };
  export default Map;
