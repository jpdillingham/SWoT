import axios from 'axios'

const requestExercises = () => ({
    type: 'REQUEST_EXERCISES'
})

const receiveExercises = (status, items) => ({
    type: 'RECEIVE_EXERCISES',
    status: status,
    items: items
})

const add = (exercise) => ({
    type: 'ADD_EXERCISE',
    exercise: { ...exercise, url: 'https://www.bodybuilding.com/exercises/' + exercise.url }
})

export const addExercise = (exercise) => (dispatch) => {
    return new Promise((resolve, reject) => { 
            axios.post(endpoint, exercise)
                .then(response => {
                    dispatch(add(JSON.parse(response.data)))
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
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