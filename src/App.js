import 'mapbox-gl/dist/mapbox-gl.css';
import { getTripsFromCache } from './Georide';
import showMap from './Map';
import { getOptions, setOptions, getFormOptions, setFormOptions, setDefaultOptions } from './Options';

const optionButtonSaveEl = document.getElementById('option-button-save');
const optionResetSaveEl = document.getElementById('option-button-reset');

optionButtonSaveEl.addEventListener('click', () => {
    const options = getFormOptions();
    setOptions(options);
    location.reload();
});

optionResetSaveEl.addEventListener('click', () => {
    setDefaultOptions();
    location.reload();
});

const options = getOptions();
setFormOptions(options);

getTripsFromCache()
    .then((res) => {
        showMap(res, options);
    })
    .catch((err) => {
        console.error(err);
    });
