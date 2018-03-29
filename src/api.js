import axios from 'axios'
import { store } from './index'
import { ensureSession } from './components/security/SecurityActions'

export const api = axios.create();

api.interceptors.request.use(config => {
        return store.dispatch(ensureSession()).then(() => {
            config.headers.Authorization = store.getState().security.session.idToken.jwtToken;

            return Promise.resolve(config);
        }, err => {
            return Promise.reject('Invalid session: ' + err);
        })
    }, err => {
        return Promise.reject('API subsystem error: ' + err);
    }
);