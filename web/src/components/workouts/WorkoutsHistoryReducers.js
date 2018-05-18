const initialState = []

const WorkoutsHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WORKOUTS_HISTORY_GET':
            return { workouts: action.workouts, totalCount: action.totalCount }
        case 'WORKOUT_HISTORY_GET':
            return state.workouts && state.workouts.find(w => w.id === action.workout.id) ?
                state.workouts.map(w => {
                    return w.id === action.workout.id ? action.workout : w
                }) :
                (state.workouts || []).concat(action.workout);
        default:
            return state;
    }
}

export default WorkoutsHistoryReducer