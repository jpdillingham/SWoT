import axios from 'axios'
let api = axios.create();

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

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    console.log('here is where we will refresh the token')
    //originalRequest._retry = true;

/*     const refreshToken = window.localStorage.getItem('refreshToken');
    return axios.post('http://localhost:8000/auth/refresh', { refreshToken })
      .then(({data}) => {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('refreshToken', data.refreshToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
        return axios(originalRequest);
      }); */
  }

  return Promise.reject(error);
});

const setSessionFromState = (getState) => {
    session = getState().security.session;  
}

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment/routines'

const routinesPost = (routine) => ({
    type: 'ROUTINES_POST',
    routine: routine
})

export const addRoutine = (routine) => (dispatch, getState) => {
    setSessionFromState(getState);

    return new Promise((resolve, reject) => { 
        api.post(endpoint, routine)
            .then(response => {
                if (response.status === 201) {
                    dispatch(routinesPost(response.data))
                    resolve(response)
                }
                else {
                    reject("Unknown POST response code (expected 201, received " + response.status + ").")
                }
                
            }, error => {
                reject(error)
            })
        })
}

const routinesPut = (routine) => ({
    type: 'ROUTINES_PUT',
    routine: routine
})

export const updateRoutine = (routine) => (dispatch, getState) => {
    setSessionFromState(getState);

    return new Promise((resolve, reject) => {
        api.put(endpoint + "/" + routine.id, routine)
            .then(response => {
                if (response.status === 200) {
                    dispatch(routinesPut(response.data))
                    resolve(response)
                }
                else {
                    reject("Unknown PUT response code (expected 200, received " + response.status + ").")
                }
            }, error => {
                reject(error)
            })
        })
}

const routinesGet = (routines) => ({
    type: 'ROUTINES_GET',
    routines: routines
})

export const fetchRoutines = () => (dispatch, getState) => {
    setSessionFromState(getState);

    return new Promise((resolve, reject) => {
        api.get(endpoint)
            .then(response => {
                dispatch(routinesGet(response.data))
                resolve(response)
            }, error => {
                reject(error)
            })    
    })
}

const routinesDelete = (id) => ({
    type: 'ROUTINES_DELETE',
    id: id
})

export const deleteRoutine = (id) => (dispatch, getState) => {
    setSessionFromState(getState);

    return new Promise((resolve, reject) => {
        api.delete(endpoint + "/" + id)
            .then(response => {
                if (response.status === 204) {
                    dispatch(routinesDelete(id))
                    resolve(response)
                }
                else {
                    reject("Unknown DELETE response code (expected 204, received " + response.status + ").")
                }
            }, error => {
                reject(error)
            })
    })
}