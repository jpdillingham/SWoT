import { ROUTINES } from '../../constants'

const routinesGet = (routines) => ({
    type: 'ROUTINES_GET',
    routines: routines
})

export const fetchRoutines = () => (dispatch) => {
    return new Promise((resolve, reject) => {
            dispatch(routinesGet(ROUTINES))
            resolve(ROUTINES)
        })     
}