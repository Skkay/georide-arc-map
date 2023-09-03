import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import { getTrips } from './georide';
import showMap from './map';

getTrips().then((res) => {
    showMap(res);
});
