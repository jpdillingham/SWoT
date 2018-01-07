import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { EXERCISES, ROUTINES } from './constants'

import App from './components/App'

const initialState = {
    exercises: EXERCISES,
    routines: ROUTINES,
    snackbar: {
        visible: false,
        message: ''
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EXERCISE':
            return { 
                ...state, exercises: state.exercises.concat(action.exercise) 
            };
        case 'DELETE_EXERCISE':
            return { 
                ...state, exercises: state.exercises.filter(e => e.id !== action.id)
            };
        case 'UPDATE_EXERCISE':
            return {
                ...state, exercises: state.exercises.map(e => { 
                    return e.id == action.exercise.id ? action.exercise : e
                })
            }
        case 'SNACKBAR_SHOW':
            return { ...state, snackbar: action.snackbar }
        case 'SNACKBAR_HIDE':
            return { ...state, snackbar: { visible: false, message: '' }}
        default:
            return state;
    }
}

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

