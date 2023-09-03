import 'mapbox-gl/dist/mapbox-gl.css';
import { getTrips } from './Georide';
import showMap from './Map';

getTrips().then((res) => {
    showMap(res);
});
