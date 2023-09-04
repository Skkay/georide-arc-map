import 'mapbox-gl/dist/mapbox-gl.css';
import { getTripsFromCache, filterTrips, getApiToken } from './Georide';
import showMap from './Map';
import { getOptions, setOptions, getFormOptions, setFormOptions, setDefaultOptions } from './Options';

const loginButtonGetApiTokenEl = document.getElementById('login-button-get_api_token');
const optionButtonSaveEl = document.getElementById('option-button-save');
const optionResetSaveEl = document.getElementById('option-button-reset');

loginButtonGetApiTokenEl.addEventListener('click', () => {
    getApiToken().then((res) => {
        const options = getOptions();
        options.georideApiToken = res.authToken;
        setOptions(options);
        location.reload();
    });
});

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
        const filteredTrips = filterTrips(res, options);
        showMap(filteredTrips, options);
    })
    .catch((err) => {
        console.error(err);
    });
