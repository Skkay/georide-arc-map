const optionInputGeorideApiToken = document.getElementById('option-input-georide-api_token');
const optionInputGeorideMinTripDistanceEl = document.getElementById('option-input-georide-min_trip_distance');
const optionInputGeorideMaxTripDistanceEl = document.getElementById('option-input-georide-max_trip_distance');
const optionInputGeorideMinDistanceEl = document.getElementById('option-input-georide-min_distance');
const optionInputGeorideMaxDistanceEl = document.getElementById('option-input-georide-max_distance');
const optionSelectMapStyleEl = document.getElementById('option-select-map-style');
const optionInputMapZoomEl = document.getElementById('option-input-map-zoom');
const optionInputMapPitchEl = document.getElementById('option-input-map-pitch');
const optionInputMapArcWidthEl = document.getElementById('option-input-map-arc_width');
const optionInputMapArcStartColor = document.getElementById('option-input-map-arc_start_color');
const optionInputMapArcEndColor = document.getElementById('option-input-map-arc_end_color');

const defaultOptions = {
    georideApiToken: '',
    georideMinTripDistance: 0,
    georideMaxTripDistance: 1000000,
    georideMinDistance: 0,
    georideMaxDistance: 1000000,
    mapStyle: 'mapbox://styles/mapbox/dark-v11',
    mapZoom: 6,
    mapPitch: 30,
    mapArcWidth: 3,
    mapArcStartColor: '#0080C8',
    mapArcEndColor: '#C80050',
};

const setDefaultOptions = () => {
    localStorage.setItem('options', JSON.stringify(defaultOptions));

    return JSON.parse(localStorage.getItem('options'));
};

const getOptions = () => {
    let options = JSON.parse(localStorage.getItem('options'));

    if (options === null) {
        options = setDefaultOptions();
    }

    return options;
};

const setOptions = (options) => {
    localStorage.setItem('options', JSON.stringify(options));
};

const getFormOptions = () => {
    const options = {
        georideApiToken: optionInputGeorideApiToken.value,
        georideMinTripDistance: parseInt(optionInputGeorideMinTripDistanceEl.value),
        georideMaxTripDistance: parseInt(optionInputGeorideMaxTripDistanceEl.value),
        georideMinDistance: parseInt(optionInputGeorideMinDistanceEl.value),
        georideMaxDistance: parseInt(optionInputGeorideMaxDistanceEl.value),
        mapStyle: optionSelectMapStyleEl.value,
        mapZoom: parseInt(optionInputMapZoomEl.value),
        mapPitch: parseInt(optionInputMapPitchEl.value),
        mapArcWidth: parseInt(optionInputMapArcWidthEl.value),
        mapArcStartColor: optionInputMapArcStartColor.value,
        mapArcEndColor: optionInputMapArcEndColor.value,
    };

    return options;
};

const setFormOptions = (options) => {
    optionInputGeorideApiToken.value = options.georideApiToken;
    optionInputGeorideMinTripDistanceEl.value = options.georideMinTripDistance;
    optionInputGeorideMaxTripDistanceEl.value = options.georideMaxTripDistance;
    optionInputGeorideMinDistanceEl.value = options.georideMinDistance;
    optionInputGeorideMaxDistanceEl.value = options.georideMaxDistance;
    optionSelectMapStyleEl.value = options.mapStyle;
    optionInputMapZoomEl.value = options.mapZoom;
    optionInputMapPitchEl.value = options.mapPitch;
    optionInputMapArcWidthEl.value = options.mapArcWidth;
    optionInputMapArcStartColor.value = options.mapArcStartColor;
    optionInputMapArcEndColor.value = options.mapArcEndColor;
};

export { setDefaultOptions, getOptions, setOptions, getFormOptions, setFormOptions, defaultOptions };
