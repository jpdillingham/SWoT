import { combineReducers } from 'redux'
import { ROUTINES } from './constants'
import ExercisesReducer from './components/exercises/ExercisesReducer'
import AppReducer from './components/app/AppReducer';

const initialState = {
    routines: ROUTINES,
    snackbar: {
        visible: false,
        message: ''
    }
}

const routines = (state = initialState.routines, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const rootReducer = combineReducers({ 
    app: AppReducer, 
    exercises: ExercisesReducer,
    routines 
})
  
export default rootReducer