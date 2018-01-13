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

const add = (exercise) => ({
  type: 'ADD_EXERCISE',
  exercise: exercise  
})

export const addExercise = (exercise) => {
    return function(dispatch) {
        return new Promise(function(resolve, reject) { 
            resolve()
        })
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