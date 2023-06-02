import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: 'AIzaSyAMaCecQTrxijgcLjHpZvPM_brjF4dQEA8',
    version: 'weekly',
    libraries: ['places'],
  });
  export default loader;