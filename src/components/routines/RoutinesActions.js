import axios from 'axios'
import { ROUTINES } from '../../constants'

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment/routines'

const routinesGet = (routines) => ({
    type: 'ROUTINES_GET',
    routines: routines
})

export const fetchRoutines = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.get(endpoint)
        .then(response => {
            dispatch(routinesGet(response.data))
            resolve(response)
        }, error => {
            reject(error)
        })    
    })
}

const routinesDelete = (id) => ({
    type: 'ROUTINES_DELETE',
    id: id
})

export const deleteRoutine = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
            dispatch(routinesDelete(id))
            resolve(ROUTINES)
        })
}