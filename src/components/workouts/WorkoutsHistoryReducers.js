const initialState = []

const WorkoutsHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'COMPLETED_WORKOUTS_GET':
            return action.completedWorkouts
        default:
            return state;
    }
}

export default WorkoutsHistoryReducer