const optionSelectMapStyleEl = document.getElementById('option-select-map-style');
const optionInputMapZoomEl = document.getElementById('option-input-map-zoom');
const optionInputMapPitchEl = document.getElementById('option-input-map-pitch');
const optionInputMapArcWidthEl = document.getElementById('option-input-map-arc_width');
const optionInputMapArcStartColor = document.getElementById('option-input-map-arc_start_color');
const optionInputMapArcEndColor = document.getElementById('option-input-map-arc_end_color');

const defaultOptions = {
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
    optionSelectMapStyleEl.value = options.mapStyle;
    optionInputMapZoomEl.value = options.mapZoom;
    optionInputMapPitchEl.value = options.mapPitch;
    optionInputMapArcWidthEl.value = options.mapArcWidth;
    optionInputMapArcStartColor.value = options.mapArcStartColor;
    optionInputMapArcEndColor.value = options.mapArcEndColor;
};

export { setDefaultOptions, getOptions, setOptions, getFormOptions, setFormOptions, defaultOptions };
