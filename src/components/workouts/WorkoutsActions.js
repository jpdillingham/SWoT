import api from '../../api';

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment/workouts';

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