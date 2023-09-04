import 'mapbox-gl/dist/mapbox-gl.css';
import { getTripsFromCache, filterTrips, getApiToken, getTrackers } from './Georide';
import showMap from './Map';
import { getOptions, setOptions, getFormOptions, setFormOptions, setDefaultOptions } from './Options';

const loginButtonGetApiTokenEl = document.getElementById('login-button-get_api_token');
const trackerButtonListTrackersEl = document.getElementById('tracker-button-list_trackers');
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

const options = getOptions();
setFormOptions(options);

getTripsFromCache()
    .then((res) => {
        const filteredTrips = filterTrips(res, options);
        document.getElementById('loading-spinner').remove();
        showMap(filteredTrips, options);
    })
    .catch((err) => {
        console.error(err);
    });
