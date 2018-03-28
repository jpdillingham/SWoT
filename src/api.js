import axios from 'axios'
import { checkSession } from './components/security/SecurityActions'

export const api = axios.create();
let session;

api.interceptors.request.use(function(config) {
    if (session && session.idToken) {
      config.headers.Authorization = session.idToken.jwtToken;
    }
  
    return config;
  }, function(err) {
    return Promise.reject(err);
  }
);

api.invoke = (config) => {
    return new Promise((resolve, reject) => {
        config.dependencies.dispatch(checkSession())
        .then(() => {
            session = config.dependencies.getState().security.session;  

            return config.request();
        }, err => reject('Invalid session: ' + err))
        .then((response) => config.response(response, resolve, reject), err => reject('API error: ' + err));
    });
}