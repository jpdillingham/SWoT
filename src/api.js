import axios from 'axios'
import { store } from './index'
import { checkSession } from './components/security/SecurityActions'

export const api = axios.create();

api.interceptors.request.use(config => {
        return store.dispatch(checkSession()).then(() => {
            config.headers.Authorization = store.getState().security.session.idToken.jwtToken;

            return Promise.resolve(config);
        }, err => {
            return Promise.reject('Invalid session: ' + err);
        })
    }, err => {
        return Promise.reject('API subsystem error: ' + err);
    }
);

api.invoke = (request) => {
    return new Promise((resolve, reject) => {
        store.dispatch(checkSession())
        .then(() => {
            return request();
        }, err => reject('Invalid session: ' + err))
        .then((response) => {
            resolve(response)
        }, err => reject('API error: ' + err));
    });
}