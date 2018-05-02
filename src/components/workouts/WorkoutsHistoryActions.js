import api from '../../api';
import { API_ROOT } from "../../constants"

const endpoint = API_ROOT + '/workouts';

const workoutsHistoryGet = (workouts, limit, offset) => ({
    type: 'WORKOUTS_HISTORY_GET',
    workouts: workouts,
    limit: limit,
    offset: offset,
})

export const fetchWorkoutsHistory = (limit, offset) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.get(endpoint + '?status=done&limit=' + limit + '&offset=' + offset)
        .then(response => {
            dispatch(workoutsHistoryGet(response.data, limit, offset));
            resolve(response);
        }, error => {
            reject('API error: ' + error);
        });    
    });
}