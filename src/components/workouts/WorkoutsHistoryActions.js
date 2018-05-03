import api from '../../api';
import { API_ROOT } from "../../constants"

const endpoint = API_ROOT + '/workouts';

const workoutsHistoryGet = (workouts, filters) => ({
    type: 'WORKOUTS_HISTORY_GET',
    workouts: workouts,
    filters: filters,
})

export const fetchWorkoutsHistory = (filters) => (dispatch, getState) => {
    let queryParams = '?';
    queryParams += 'status=done';

    Object.keys(filters).forEach(f => {
        queryParams += '&' + f + '=' + filters[f];
    })

    return new Promise((resolve, reject) => {
        api.get(endpoint + queryParams)
        .then(response => {
            dispatch(workoutsHistoryGet(response.data, filters));
            resolve(response);
        }, error => {
            reject('API error: ' + error);
        });    
    });
}