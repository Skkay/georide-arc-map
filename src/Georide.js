import { haversine } from './utils';

const GEORIDE_API_KEY = import.meta.env.VITE_GEORIDE_API_KEY;
const GEORIDE_TRACKER_ID = import.meta.env.VITE_GEORIDE_TRACKER_ID;
const GEORIDE_API_URL = 'https://api.georide.com';

const loginInputGeorideEmailEl = document.getElementById('login-input-georide-email');
const loginInputGeoridePasswordEl = document.getElementById('login-input-georide-password');

const getApiToken = () => {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: loginInputGeorideEmailEl.value,
            password: loginInputGeoridePasswordEl.value,
        }),
    };

    return fetch(`${GEORIDE_API_URL}/user/login`, init).then((res) => res.json());
};

const getTrips = (from = '2000-01-01', to = '2099-12-31') => {
    const init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GEORIDE_API_KEY}`,
        },
    };

    return fetch(`${GEORIDE_API_URL}/tracker/${GEORIDE_TRACKER_ID}/trips?from=${from}&to=${to}`, init)
        .then((res) => res.json())
        .then((data) => {
            return data.map((trip) => ({
                id: trip.id,
                startLat: trip.startLat,
                startLon: trip.startLon,
                endLat: trip.endLat,
                endLon: trip.endLon,
                distance: trip.distance,
            }));
        });
};

const getTripsFromCache = (forceRefresh = false) => {
    const trips = localStorage.getItem('georide-trips');

    if (trips === null || forceRefresh === true) {
        return getTrips().then((res) => {
            localStorage.setItem('georide-trips', JSON.stringify(res));
            return res;
        });
    }

    return Promise.resolve(JSON.parse(trips));
};

const filterTrips = (trips, options) => {
    return trips.filter((trip) => {
        if (trip.distance < options.georideMinTripDistance * 1000) {
            return false;
        }

        if (trip.distance > options.georideMaxTripDistance * 1000) {
            return false;
        }

        if (haversine(trip.startLat, trip.startLon, trip.endLat, trip.endLon) < options.georideMinDistance * 1000) {
            return false;
        }

        if (haversine(trip.startLat, trip.startLon, trip.endLat, trip.endLon) > options.georideMaxDistance * 1000) {
            return false;
        }

        return true;
    });
};

export { getApiToken, getTrips, getTripsFromCache, filterTrips };
