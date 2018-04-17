import api from '../../api';
import { API_ROOT } from "../../constants"

const endpoint = API_ROOT + '/workouts';

const workoutsPost = (workout) => ({
    type: 'WORKOUTS_POST',
    workout: workout
})

const workoutsPut = (workout) => ({
    type: 'WORKOUTS_PUT',
    workout: workout
})

const workoutsGet = (workouts) => ({
    type: 'WORKOUTS_GET',
    workouts: workouts
})

const workoutsDelete = (id) => ({
    type: 'WORKOUTS_DELETE',
    id: id
})

export const fetchWorkouts = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.get(endpoint)
        .then(response => {
            dispatch(workoutsGet(response.data));
            resolve(response);
        }, error => {
            reject('API error: ' + error);
        });    
    });
}

export const addWorkout = (workout) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.post(endpoint, workout)
        .then(response => {
            if (response.status === 201) {
                dispatch(workoutsPost(response.data))
                resolve(response)
            }
            else {
                reject("Unknown POST response code (expected 201, received " + response.status + ").")
            }            
        }, error => {
            reject('API error: ' + error);
        });
    });
}

export const updateWorkout = (workout) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.put(endpoint + "/" + workout.id, workout)
        .then(response => {
            if (response.status === 200) {
                dispatch(workoutsPut(response.data));
                resolve(response);
            }
            else {
                reject("API error: Unknown PUT response code (expected 200, received " + response.status + ").");
            }            
        }, error => {
            reject('API error: ' + error);
        });
    });
}

export const deleteWorkout = (id) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.delete(endpoint + '/' + id)
        .then(response => {
            if (response.status === 204) {
                dispatch(workoutsDelete(id));
                resolve(response);
            }
            else {
                reject("Unknown DELETE response code (expected 204, received " + response.status + ").");
            } 
        }, error => {
            reject('API error: ' + error);
        });
    });
}