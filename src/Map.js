import { MapboxOverlay } from '@deck.gl/mapbox';
import { ArcLayer } from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';
import { defaultOptions } from './Options';
import { hexToRgb } from './utils';

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

const showMap = (data, options = {}) => {
    options = { ...defaultOptions, ...options };

    mapboxgl.accessToken = MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
        container: 'map',
        style: options.mapStyle,
        projection: 'mercator',
        center: [2.43, 47.05],
        zoom: options.mapZoom,
        bearing: 0,
        pitch: options.mapPitch,
    });

    const mapArcStartColor = hexToRgb(options.mapArcStartColor);
    const mapArcEndColor = hexToRgb(options.mapArcEndColor);
    const deckOverlay = new MapboxOverlay({
        layers: [
            new ArcLayer({
                id: 'arcs',
                data: data,
                getSourcePosition: (d) => [d.startLon, d.startLat],
                getTargetPosition: (d) => [d.endLon, d.endLat],
                getSourceColor: [mapArcStartColor.r, mapArcStartColor.g, mapArcStartColor.b],
                getTargetColor: [mapArcEndColor.r, mapArcEndColor.g, mapArcEndColor.b],
                getWidth: options.mapArcWidth,
            }),
        ],
    });

    map.addControl(deckOverlay);
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
};

export default showMap;
