import 'mapbox-gl/dist/mapbox-gl.css';
import { getTripsFromCache, filterTrips, getApiToken, getTrackers } from './Georide';
import showMap from './Map';
import { getOptions, setOptions, getFormOptions, setFormOptions, setDefaultOptions } from './Options';

const loginButtonGetApiTokenEl = document.getElementById('login-button-get_api_token');
const trackerButtonListTrackersEl = document.getElementById('tracker-button-list_trackers');
const optionButtonSaveEl = document.getElementById('option-button-save');
const optionResetSaveEl = document.getElementById('option-button-reset');
const buttonForceRefreshEl = document.getElementById('button-force_refresh');

const infoPanelEl = document.getElementById('info-panel');
const loadingSpinnerEl = document.getElementById('loading-spinner');
const errorInfoEl = document.getElementById('error-info');

loginButtonGetApiTokenEl.addEventListener('click', () => {
    getApiToken().then((res) => {
        const options = getOptions();
        options.georideApiToken = res.authToken;
        setOptions(options);
        location.reload();
    });
});

trackerButtonListTrackersEl.addEventListener('click', () => {
    getTrackers().then((res) => {
        const trackerUlListTrackerEl = document.getElementById('tracker-ul-list_trackers');
        res.forEach((tracker) => {
            const trackerLiListTrackerEl = document.createElement('li');
            trackerLiListTrackerEl.textContent = tracker.trackerId;
            trackerLiListTrackerEl.setAttribute('title', tracker.trackerName);
            trackerUlListTrackerEl.appendChild(trackerLiListTrackerEl);
        });
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

buttonForceRefreshEl.addEventListener('click', () => {
    localStorage.removeItem('georide-trips');
    location.reload();
});

const options = getOptions();
setFormOptions(options);

getTripsFromCache()
    .then((res) => {
        const filteredTrips = filterTrips(res, options);
        infoPanelEl.classList.add('hidden');
        showMap(filteredTrips, options);
    })
    .catch((err) => {
        console.error(err);
        loadingSpinnerEl.classList.add('hidden');
        errorInfoEl.classList.remove('hidden');
    });
