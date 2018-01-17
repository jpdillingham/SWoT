import axios from 'axios'

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment'

const exercisesPostRequest = (item) => ({
    type: 'EXERCISES_POST_REQUEST',
    item: item
})

const exercisesPostResponse = (status, item) => ({
    type: 'EXERCISES_POST_RESPONSE',
    status: status,
    item: item
})

const exercisesPostReset = () => ({ type: 'EXERCISES_POST_RESET' })

const exercisesPutRequest = (item) => ({
    type: 'EXERCISES_PUT_REQUEST',
    item: item
})

const exercisesPutResponse = (status, item) => ({
    type: 'EXERCISES_PUT_RESPONSE',
    status: status,
    item: item
})

const exercisesPutReset = () => ({ type: 'EXERCISES_PUT_RESET' })



export const addExercise = (exercise) => (dispatch) => {
    if (!exercise.url.toLowerCase().startsWith('http')) {
        exercise.url = 'https://www.bodybuilding.com/exercises/' + exercise.url
    }

    dispatch(exercisesPostRequest(exercise))

    return new Promise((resolve, reject) => { 
        axios.post(endpoint, exercise)
            .then(response => {
                dispatch(exercisesPostResponse(response.status, response.data))
                resolve(response)
            }, error => {
                dispatch(exercisesPostResponse(error.response ? error.response.status : 500, {}))
                reject(error)
            })
        })
}

export const cancelAddExercise = () => {
    return exercisesPostReset();
}

export const updateExercise = (exercise) => (dispatch) => {
    dispatch(exercisesPutRequest(exercise))

    return new Promise((resolve, reject) => {
        axios.put(endpoint, exercise)
            .then(response => {
                dispatch(exercisesPutResponse(response.status, response.data))
                resolve(response)
            }, error => {
                dispatch(exercisesPutResponse(error.response ? error.response.status : 500, {}))
                reject(error)
            })
        })
}

export const cancelUpdateExercise = () => {
    return exercisesPutReset();
}

const exercisesDelete = (id) => ({
    type: 'EXERCISES_DELETE',
    id: id
})

export const deleteExercise = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.delete(endpoint, id)
            .then(response => {
                dispatch(exercisesDelete(id))
                resolve(response)
            }, error => {
                reject(error)
            })
        })
}

const exercisesGet = (items) => ({
    type: 'EXERCISES_GET',
    items: items
})

export const fetchExercises = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.get(endpoint)
        .then(response => { 
            dispatch(exercisesGet(response.data))
            resolve(response.data)
        }, error => {
            reject(error)
        })     
    }) 
}