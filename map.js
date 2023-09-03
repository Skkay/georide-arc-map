import { MapboxOverlay } from '@deck.gl/mapbox';
import { ArcLayer } from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';

const showMap = (data) => {
    const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

    mapboxgl.accessToken = MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        projection: 'mercator',
        center: [0.45, 51.47],
        zoom: 4,
        bearing: 0,
        pitch: 30,
    });

    const deckOverlay = new MapboxOverlay({
        layers: [
            new ArcLayer({
                id: 'arcs',
                data: data,
                getSourcePosition: (d) => [d.startLon, d.startLat],
                getTargetPosition: (d) => [d.endLon, d.endLat],
                getSourceColor: [0, 128, 200],
                getTargetColor: [200, 0, 80],
                getWidth: 2,
            }),
        ],
    });

    map.addControl(deckOverlay);
    map.addControl(new mapboxgl.NavigationControl());
};

export default showMap;
