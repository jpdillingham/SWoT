import api from '../../api';
import { API_ROOT } from "../../constants"

const endpoint = API_ROOT + '/workouts';

const workoutsHistoryGet = (workouts, filters, totalCount) => ({
    type: 'WORKOUTS_HISTORY_GET',
    workouts: workouts,
    filters: filters,
    totalCount: totalCount,
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
            let totalCount = parseInt(response.headers['x-total-count'], 10)
            dispatch(workoutsHistoryGet(response.data, filters, totalCount));
            resolve(response);
        }, error => {
            reject('API error: ' + error);
        });    
    });
}