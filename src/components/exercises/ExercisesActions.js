import axios from 'axios'

function requestExercises() {
    return {
        type: 'REQUEST_EXERCISES'
    }
}


function receiveExercises(status, items) {
    return {
        type: 'RECEIVE_EXERCISES',
        status: status,
        items: items
    }
}

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment'

export function fetchExercises() {
    return function(dispatch, getState) {
        dispatch(requestExercises())

        axios.get(endpoint)
            .then(response => { 
                dispatch(receiveExercises(response.status, response.data))
            })      
    }
}