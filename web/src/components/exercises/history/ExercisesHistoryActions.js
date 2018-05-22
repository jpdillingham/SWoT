import api from '../../../api';
import { API_ROOT } from "../../../constants"

const endpoint = API_ROOT + '/exercises/history';

const exercisesHistoryGet = (exercises, totalCount) => ({
    type: 'EXERCISES_HISTORY_GET',
    exercises: exercises,
    totalCount: totalCount,
});

export const fetchExercisesHistory = (filters) => (dispatch, getState) => {
    let queryParams = '?';

    Object.keys(filters).forEach(f => {
        if (filters[f] !== undefined) {
            queryParams += '&' + f + '=' + filters[f];
        }
    })

    return new Promise((resolve, reject) => {
        api.get(endpoint + queryParams)
        .then(response => {
            let totalCount = parseInt(response.headers['x-total-count'], 10)
            dispatch(exercisesHistoryGet(response.data, totalCount));
            resolve(response);
        }, error => {
            reject('API error: ' + error);
        });    
    });
}