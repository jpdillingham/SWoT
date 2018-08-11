import api from '../../../api';
import { API_ROOT } from "../../../constants";

const endpoint = API_ROOT + '/exercises/history';

const exercisesHistoryGet = (exercises, totalCount) => ({
    type: 'EXERCISES_HISTORY_GET',
    exercises: exercises,
    totalCount: totalCount,
});

const exercisesHistoryClear = () => ({
    type: 'EXERCISES_HISTORY_CLEAR',
});

export const fetchExercisesHistory = (filters) => (dispatch, getState) => {
    let id = '';

    if (filters.exerciseId) {
        id = '/' + filters.exerciseId + '/';
    }

    let queryParams = Object.keys(filters)
        .filter(f => f !== 'exerciseId')
        .filter(f => filters[f] !== undefined)
        .reduce((acc, f) => acc.concat('&' + f + '=' + filters[f]), '?');

    return new Promise((resolve, reject) => {
        api.get(endpoint + id + queryParams)
        .then(response => {
            let totalCount = parseInt(response.headers['x-total-count'], 10);
            dispatch(exercisesHistoryGet(response.data, totalCount));
            resolve(response);
        }, error => {
            reject(error.response.message);
        });    
    });
};

export const clearExercisesHistory = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch(exercisesHistoryClear());
        resolve();
    });
};