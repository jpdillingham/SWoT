import { combineReducers } from 'redux'

import exercises from './exercises'
import snackbar from './snackbar'
import routines from './routines'

const rootReducer = combineReducers({ 
    exercises, 
    snackbar, 
    routines 
})
  
export default rootReducer