import axios from 'axios'

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment'

const exercisesGetRequest = () => ({
    type: 'EXERCISES_GET_REQUEST'
})

const exercisesGetResponse = (status, items) => ({
    type: 'EXERCISES_GET_RESPONSE',
    status: status,
    items: items
})

const exercisesPostRequest = () => ({
    type: 'EXERCISES_POST_REQUEST'
})

const exercisesPostResponse = (status, item) => ({
    type: 'EXERCISES_POST_RESPONSE',
    status: status,
    item: item
})

const exercisesPostReset = () => ({ type: 'EXERCISES_POST_RESET' })

export const addExercise = (exercise) => (dispatch) => {
    if (!exercise.url.toLowerCase().startsWith('http')) {
        exercise.url = 'https://www.bodybuilding.com/exercises/' + exercise.url
    }

    dispatch(exercisesPostRequest())

    return new Promise((resolve, reject) => { 
            axios.post(endpoint, exercise)
                .then(response => {
                    dispatch(exercisesPostResponse(response.status, response.data))
                    resolve(response)
                }, error => {
                    console.log('a', error.response)
                    dispatch(exercisesPostResponse(error.response.status || -1, {}))
                    reject(error)
                })
        })
}

export const cancelAddExercise = () => {
    return exercisesPostReset();
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
    dispatch(exercisesGetRequest())

    return new Promise((resolve, reject) => {
        axios.get(endpoint)
        .then(response => { 
            dispatch(exercisesGetResponse(response.status, response.data))
            resolve(response.data)
        }, error => {
            dispatch(exercisesGetResponse(error.response.status || -1, []))
            reject(error)
        })     
    }) 
}