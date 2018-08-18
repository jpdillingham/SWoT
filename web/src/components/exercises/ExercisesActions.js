import api from '../../api';
import { API_ROOT } from '../../constants';

const endpoint = API_ROOT + '/exercises';

const exercisesGet = (exercises) => ({
    type: 'EXERCISES_GET',
    exercises: exercises,
});

const exercisesPost = (exercise) => ({
    type: 'EXERCISES_POST',
    exercise: exercise,
});

const exercisesPut = (exercise) => ({
    type: 'EXERCISES_PUT',
    exercise: exercise,
});

const exercisesDelete = (id) => ({
    type: 'EXERCISES_DELETE',
    id: id,
});

export const fetchExercises = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.get(endpoint)
        .then(response => { 
            dispatch(exercisesGet(response.data));
            resolve(response);
        }, error => {
            reject(error.response.message);
        });
    });
};

export const addExercise = (exercise) => (dispatch, getState) => {
    if (!exercise.url.toLowerCase().startsWith('http')) {
        exercise.url = 'https://www.bodybuilding.com/exercises/' + exercise.url;
    }

    return new Promise((resolve, reject) => { 
        api.post(endpoint, exercise)
        .then(response => {
            if (response.status === 201) {
                dispatch(exercisesPost(response.data));
                resolve(response);
            }
            else {
                reject('Unknown POST response code (expected 201, received ' + response.status + ').');
            }
        }, error => {
            reject(error);
        });
    });
};

export const updateExercise = (exercise) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.put(endpoint + '/' + exercise.id, exercise)
        .then(response => {
            if (response.status === 200) {
                dispatch(exercisesPut(response.data));
                resolve(response);
            }
            else {
                reject('Unknown PUT response code (expected 200, received ' + response.status + ').');
            }
        }, error => {
            reject(error);
        });
    });
};

export const deleteExercise = (id) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api.delete(endpoint + '/' + id)
        .then(response => {
            if (response.status === 204) {
                dispatch(exercisesDelete(id));
                resolve(response);
            }
            else {
                reject('Unknown DELETE response code (expected 204, received ' + response.status + ').');
            }
        }, error => {
            reject(error);
        });
    });
};