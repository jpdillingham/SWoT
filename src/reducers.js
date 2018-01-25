import { combineReducers } from 'redux'
import ExercisesReducer from './components/exercises/ExercisesReducer'
import AppReducer from './components/app/AppReducer';
import RoutinesReducer from './components/routines/RoutinesReducer'

const rootReducer = combineReducers({ 
    app: AppReducer, 
    exercises: ExercisesReducer,
    routines: RoutinesReducer,
})
  
export default rootReducer