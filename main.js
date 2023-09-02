import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

console.log(MAPBOX_API_KEY);

mapboxgl.accessToken = MAPBOX_API_KEY;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
});
