import axios from 'axios';
import { store } from './index';
import { refreshSession, logout } from './components/security/SecurityActions';

const api = axios.create();

api.interceptors.request.use(config => {
        return store.dispatch(() => {
            config.headers.Authorization = store.getState().security.session.idToken.jwtToken;

            return Promise.resolve(config);
        }, err => {
            return Promise.reject('Invalid session: ' + err);
        });
    }, err => {
        return Promise.reject('API subsystem error: ' + err);
    }
);

api.interceptors.response.use(config => {
    return config;
}, error => {
    let request = error.config;
    let status = error.response.status;
    let refreshToken = store.getState().security.session.refreshToken.token;

    if (status === 401 || status === 403) {
        if (refreshToken) {
            return store.dispatch(refreshSession())
                .then(response => {
                    request.headers.Authorization = store.getState().security.session.idToken.jwtToken;
                    return axios(request);
                }
            );
        }
        else {
            store.dispatch(logout());
        }
    } 
});

export default api;