import axios from 'axios'

const requestExercises = () => {
    return {
        type: 'REQUEST_EXERCISES'
    }
}

const receiveExercises = (status, items) => {
    return {
        type: 'RECEIVE_EXERCISES',
        status: status,
        items: items
    }
}

export const addExercise = (exercise) => {
    return {
        type: 'ADD_EXERCISE',
        exercise: exercise
    }
}

export const deleteExercise = (id) => {
    return {
        type: 'DELETE_EXERCISE',
        id: id
    }
}

export const updateExercise = (exercise) => {
    return {
        type: 'UPDATE_EXERCISE',
        exercise: exercise
    }
}

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment'

export const fetchExercises = () => {
    return function(dispatch, getState) {
        dispatch(requestExercises())

        axios.get(endpoint)
            .then(response => { 
                dispatch(receiveExercises(response.status, response.data))
            })      
    }
}