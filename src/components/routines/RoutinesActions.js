import axios from 'axios'

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment'

import { ROUTINES } from '../../constants'

const routinesGet = (routines) => ({
    type: 'ROUTINES_GET',
    routines: routines
})

export const fetchRoutines = () => (dispatch) => {
    return new Promise((resolve, reject) => {
            dispatch(routinesGet(ROUTINES))
            resolve(ROUTINES)
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