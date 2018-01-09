import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';

import { ROUTINES } from './constants'

import App from './components/App'

const initialState = {
    exercises: [],
    routines: ROUTINES,
    snackbar: {
        visible: false,
        message: ''
    }
}

const routinesReducer = (state = initialState.routines, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
const exercisesReducer = (state = initialState.exercises, action) => {
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

const snackbarReducer = (state = initialState.snackbar, action) => { 
    switch (action.type) {
        case 'SNACKBAR_SHOW':
            return action.snackbar;
        case 'SNACKBAR_HIDE':
            return { visible: false, message: '' }
        default:
            return state;
    }
}

const reducer = combineReducers({ exercises: exercisesReducer, snackbar: snackbarReducer })
const store = createStore(reducer);

store.subscribe(() => {
    console.log('State Updated:', store.getState())
})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

