import 'mapbox-gl/dist/mapbox-gl.css';
import { getTripsFromCache } from './Georide';
import showMap from './Map';

getTripsFromCache().then((res) => {
    showMap(res);
});
