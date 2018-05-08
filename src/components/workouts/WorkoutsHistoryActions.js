import api from '../../api';
import { API_ROOT } from "../../constants"

const endpoint = API_ROOT + '/workouts';

const workoutsHistoryGet = (workouts, totalCount) => ({
    type: 'WORKOUTS_HISTORY_GET',
    workouts: workouts,
    totalCount: totalCount,
})

export const fetchWorkoutHistory = (id) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.get(endpoint + '/' + id)
        .then(response => {
            resolve(response);        
        }, error => {
            reject(error);
        })
    })
}

export const fetchWorkoutsHistory = (filters) => (dispatch, getState) => {
    let queryParams = '?';
    queryParams += 'status=done';

    Object.keys(filters).forEach(f => {
        if (filters[f] !== undefined) {
            queryParams += '&' + f + '=' + filters[f];
        }
    })

    return new Promise((resolve, reject) => {
        api.get(endpoint + queryParams)
        .then(response => {
            let totalCount = parseInt(response.headers['x-total-count'], 10)
            dispatch(workoutsHistoryGet(response.data, totalCount));
            resolve(response);
        }, error => {
            reject('API error: ' + error);
        });    
    });
}