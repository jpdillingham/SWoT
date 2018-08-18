import api from '../../../api';
import { API_ROOT } from '../../../constants';

const endpoint = API_ROOT + '/workouts/history';

const workoutsHistoryGet = (workouts, totalCount) => ({
    type: 'WORKOUTS_HISTORY_GET',
    workouts: workouts,
    totalCount: totalCount,
});

const workoutsHistoryClear = () => ({
    type: 'WORKOUTS_HISTORY_CLEAR',
});

const workoutHistoryGet = (workout) => ({
    type: 'WORKOUT_HISTORY_GET',
    workout: workout,
});

const workoutHistoryClear = () => ({
    type: 'WORKOUT_HISTORY_CLEAR',
});

const workoutHistoryDelete = (id) => ({
    type: 'WORKOUT_HISTORY_DELETE',
    workoutId: id,
});

const workoutHistoryPut = (workout) => ({
    type: 'WORKOUT_HISTORY_PUT',
    workout: workout,
});

export const fetchWorkoutsHistory = (filters) => (dispatch, getState) => {
    filters = filters || {};

    let queryParams = '?';
    queryParams += 'status=done';

    Object.keys(filters).forEach(f => {
        if (filters[f] !== undefined) {
            queryParams += '&' + f + '=' + filters[f];
        }
    });

    return new Promise((resolve, reject) => {
        api.get(endpoint + queryParams)
        .then(response => {
            let totalCount = parseInt(response.headers['x-total-count'], 10);
            dispatch(workoutsHistoryGet(response.data, totalCount));
            resolve(response);
        }, error => {
            reject(error);
        });    
    });
};

export const clearWorkoutsHistory = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch(workoutsHistoryClear());
        resolve();
    });
};

export const fetchWorkoutHistory = (id) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.get(endpoint + '/' + id)
        .then(response => {
            dispatch(workoutHistoryGet(response.data));
            resolve(response);        
        }, error => {
            reject(error);
        });
    });
};

export const clearWorkoutHistory = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch(workoutHistoryClear());
        resolve();
    });
};

export const updateWorkoutHistory = (workout) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.put(endpoint + '/' + workout.id, workout)
        .then(response => {
            dispatch(workoutHistoryPut(response.data));
            resolve(response);
        }, error => {
            reject(error);
        });
    });
};

export const deleteWorkoutHistory = (id) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.delete(endpoint + '/' + id)
        .then(response => {
            if (response.status === 204) {
                dispatch(workoutHistoryDelete(id));
                resolve(response);
            }
            else {
                reject("Unknown DELETE response code (expected 204, received " + response.status + ").");
            } 
        }, error => {
            reject(error);
        });
    });
};