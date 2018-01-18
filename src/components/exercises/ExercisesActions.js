import axios from 'axios'

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment'

const exercisesPost = (item) => ({
    type: 'EXERCISES_POST',
    item: item
})

export const addExercise = (exercise) => (dispatch) => {
    if (!exercise.url.toLowerCase().startsWith('http')) {
        exercise.url = 'https://www.bodybuilding.com/exercises/' + exercise.url
    }

    return new Promise((resolve, reject) => { 
        axios.post(endpoint, exercise)
            .then(response => {
                if (response.status === 201) {
                    dispatch(exercisesPost(response.data))
                    resolve(response)
                }
                else {
                    reject("Unknown POST response code (expected 201, received " + response.status + ").")
                }
                
            }, error => {
                reject(error)
            })
        })
}

const exercisesPut = (status, item) => ({
    type: 'EXERCISES_PUT',
    status: status,
    item: item
})

export const updateExercise = (exercise) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.put(endpoint, exercise)
            .then(response => {
                dispatch(exercisesPut(response.status, response.data))
                resolve(response)
            }, error => {
                reject(error)
            })
        })
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