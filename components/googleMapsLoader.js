/**
 * Google Maps API Loader
 * 
 * This module exports a Google Maps API loader instance, which is used to load the Google Maps API
 * and its necessary libraries with the specified configuration.
 * 
 */
import { Loader } from '@googlemaps/js-api-loader';


/**
 * Google Maps API Loader instance
 * 
 * This instance is used to load the Google Maps API and its necessary libraries.
 * It is configured with the specified API key, version, and libraries.
 * 
 */
const loader = new Loader({
    apiKey: 'AIzaSyAMaCecQTrxijgcLjHpZvPM_brjF4dQEA8',
    version: 'weekly',
    libraries: ['places'],
  });
  export default loader;
