const initialState = []

const WorkoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WORKOUTS_GET':
            return action.workouts
        case 'WORKOUTS_POST':
            return state.concat(action.workout)
        case 'WORKOUTS_PUT': 
            return state.map(w => {
                return w.id === action.workout.id ? action.workout : w
            })
        case 'WORKOUTS_DELETE':
            return state.filter(w => w.id !== action.id)
        case 'COMPLETED_WORKOUTS_GET':
            return action.completedWorkouts
        default:
            return state;
    }
}

export default WorkoutsReducer