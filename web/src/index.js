import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { loadState, saveState } from './localStorage';

import App from './components/app/App';

import ExercisesReducer from './components/exercises/ExercisesReducer';
import ExercisesHistoryReducer from './components/exercises/history/ExercisesHistoryReducer';
import AppReducer from './components/app/AppReducer';
import RoutinesReducer from './components/routines/RoutinesReducer';
import WorkoutsReducer from './components/workouts/WorkoutsReducer';
import WorkoutsHistoryReducer from './components/workouts/history/WorkoutsHistoryReducer';
import SecurityReducer from './components/security/SecurityReducer';

const rootReducer = combineReducers({ 
    app: AppReducer, 
    exercises: ExercisesReducer,
    exercisesHistory: ExercisesHistoryReducer,
    routines: RoutinesReducer,
    workouts: WorkoutsReducer,
    workoutsHistory: WorkoutsHistoryReducer,
    security: SecurityReducer,
});

const persistedState = loadState();

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    let state = store.getState();
    saveState({ 
        security: { 
            ...state.security, 
            user: state.security.user,
            session: state.security.session,
        },
    });

    console.log('State Updated:', store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

