import axios from 'axios'

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment/exercises'

const exercisesPost = (exercise) => ({
    type: 'EXERCISES_POST',
    exercise: exercise
})

export const addExercise = (exercise) => (dispatch, getState) => {
    if (!exercise.url.toLowerCase().startsWith('http')) {
        exercise.url = 'https://www.bodybuilding.com/exercises/' + exercise.url
    }

    return new Promise((resolve, reject) => { 
        axios.post(endpoint, exercise, {
            headers: {
                "Authorization": getState().security.session.idToken.jwtToken
            } 
        })
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

const exercisesPut = (exercise) => ({
    type: 'EXERCISES_PUT',
    exercise: exercise
})

export const updateExercise = (exercise) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.put(endpoint, exercise, {
            headers: {
                "Authorization": getState().security.session.idToken.jwtToken
            } 
        })
            .then(response => {
                if (response.status === 200) {
                    dispatch(exercisesPut(response.data))
                    resolve(response)
                }
                else {
                    reject("Unknown PUT response code (expected 200, received " + response.status + ").")
                }
            }, error => {
                reject(error)
            })
        })
}

const exercisesDelete = (id) => ({
    type: 'EXERCISES_DELETE',
    id: id
})

export const deleteExercise = (id) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.delete(endpoint + "/" + id, {
            headers: {
                "Authorization": getState().security.session.idToken.jwtToken
            } 
        })
            .then(response => {
                if (response.status === 204) {
                    dispatch(exercisesDelete(id))
                    resolve(response)
                }
                else {
                    reject("Unknown DELETE response code (expected 204, received " + response.status + ").")
                }
            }, error => {
                reject(error)
            })
    })
}

const exercisesGet = (exercises) => ({
    type: 'EXERCISES_GET',
    exercises: exercises
})

export const fetchExercises = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.get(endpoint, {
            headers: {
                "Authorization": getState().security.session.idToken.jwtToken
            } 
        })
            .then(response => { 
                dispatch(exercisesGet(response.data))
                resolve(response)
            }, error => {
                reject(error)
            })     
    }) 
}