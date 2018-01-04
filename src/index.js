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
                ...state, exercises: state.exercises.filter(e => e.id != action.id)
            };
        case 'SNACKBAR_SHOW':
            return { ...state, snackbar: action.snackbar }
        default:
            return state;
    }
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

