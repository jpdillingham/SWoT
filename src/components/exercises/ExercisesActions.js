import axios from 'axios'

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment'



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

const exercisesPost = (status, item) => ({
    type: 'EXERCISES_POST',
    status: status,
    item: item
})

export const addExercise = (exercise) => (dispatch) => {
    if (!exercise.url.toLowerCase().startsWith('http')) {
        exercise.url = 'https://www.bodybuilding.com/exercises/' + exercise.url
    }

    return new Promise((resolve, reject) => { 
        axios.post(endpoint, exercise)
            .then(response => {
                dispatch(exercisesPost(response.status, response.data))
                resolve(response)
            }, error => {
                reject(error)
            })
        })
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
            resolve(response)
        }, error => {
            reject(error)
        })     
    }) 
}