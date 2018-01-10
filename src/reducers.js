import { combineReducers } from 'redux'
import { ROUTINES } from './constants'

const initialState = {
    exercises: [],
    routines: ROUTINES,
    snackbar: {
        visible: false,
        message: ''
    }
}

const exercises = (state = initialState.exercises, action) => {
    switch (action.type) {
        case 'SET_EXERCISES':
            return action.exercises;
        case 'ADD_EXERCISE':
            return state.concat(action.exercise);
        case 'DELETE_EXERCISE':
            return state.filter(e => e.id !== action.id);
        case 'UPDATE_EXERCISE':
            return state.map(e => { 
                    return e.id === action.exercise.id ? action.exercise : e
                })
        default:
            return state;
    }
}

const routines = (state = initialState.routines, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const snackbar = (state = initialState.snackbar, action) => { 
    switch (action.type) {
        case 'SNACKBAR_SHOW':
            return action.snackbar;
        case 'SNACKBAR_HIDE':
            return { visible: false, message: '' }
        default:
            return state;
    }
}

const rootReducer = combineReducers({ 
    exercises, 
    snackbar, 
    routines 
})
  
export default rootReducer