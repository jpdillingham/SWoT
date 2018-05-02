import api from '../../api';
import { API_ROOT } from "../../constants"

const endpoint = API_ROOT + '/workouts';

const workoutsHistoryGet = (workoutsHistory) => ({
    type: 'WORKOUTS_HISTORY_GET',
    workoutsHistory: workoutsHistory
})

export const fetchWorkoutsHistory = (limit, offset) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.get(endpoint + '?limit=' + limit + '&offset=' + offset)
        .then(response => {
            dispatch(workoutsHistoryGet(response.data));
            resolve(response);
        }, error => {
            reject('API error: ' + error);
        });    
    });
}