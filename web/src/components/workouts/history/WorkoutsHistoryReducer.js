const initialState = []

const WorkoutsHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WORKOUTS_HISTORY_GET':
            return { workouts: action.workouts, totalCount: action.totalCount }
        case 'WORKOUTS_HISTORY_CLEAR':
            return { workouts: [], totalCount: 0 }
        case 'WORKOUT_HISTORY_GET':
            return { workout: action.workout }
        case 'WORKOUT_HISTORY_CLEAR':
            return { workout: {} }
        default:
            return state;
    }
}

export default WorkoutsHistoryReducer