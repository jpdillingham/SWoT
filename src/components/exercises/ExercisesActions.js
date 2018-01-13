import axios from 'axios'

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment'

const requestExercises = () => ({
    type: 'EXERCISES_GET_REQUEST'
})

const receiveExercises = (status, items) => ({
    type: 'EXERCISES_GET_RESPONSE',
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


export const fetchExercises = () => (dispatch) => {
    dispatch(requestExercises())

    return new Promise((resolve, reject) => {
        axios.get(endpoint)
        .then(response => { 
            dispatch(receiveExercises(response.status, response.data))
            resolve(response.data)
        }, error => {
            dispatch(receiveExercises(error.response.status || -1, []))
            reject(error)
        })     
    }) 
}