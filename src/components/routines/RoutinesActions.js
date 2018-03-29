import { api } from '../../api';

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment/routines';

const routinesPost = (routine) => ({
    type: 'ROUTINES_POST',
    routine: routine
})

export const addRoutine = (routine) => (dispatch, getState) => {
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
            reject('API error: ' + error);
        })
    });
}

const routinesPut = (routine) => ({
    type: 'ROUTINES_PUT',
    routine: routine
})

export const updateRoutine = (routine) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.put(endpoint + "/" + routine.id, routine)
        .then(response => {
            if (response.status === 200) {
                dispatch(routinesPut(response.data));
                resolve(response);
            }
            else {
                reject("API error: Unknown PUT response code (expected 200, received " + response.status + ").");
            }            
        }, error => {
            reject('API error: ' + error);
        })
    });
}

const routinesGet = (routines) => ({
    type: 'ROUTINES_GET',
    routines: routines
})

export const fetchRoutines = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.get(endpoint)
            .then(response => {
                dispatch(routinesGet(response.data));
                resolve(response);
            }, error => {
                reject('API error: ' + error);
            })    
    })
}

const routinesDelete = (id) => ({
    type: 'ROUTINES_DELETE',
    id: id
})

export const deleteRoutine = (id) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.delete(endpoint + '/' + id)
            .then(response => {
                if (response.status === 204) {
                    dispatch(routinesDelete(id));
                    resolve(response);
                }
                else {
                    reject("Unknown DELETE response code (expected 204, received " + response.status + ").");
                } 
            }, error => {
                reject('API error: ' + error);
            }
        )
    })
}