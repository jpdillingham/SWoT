import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';

import App from './components/app/App'

import ExercisesReducer from './components/exercises/ExercisesReducer'
import AppReducer from './components/app/AppReducer';
import RoutinesReducer from './components/routines/RoutinesReducer'
import SecurityReducer from './components/security/SecurityReducer'

const rootReducer = combineReducers({ 
    app: AppReducer, 
    exercises: ExercisesReducer,
    routines: RoutinesReducer,
    security: SecurityReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

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

