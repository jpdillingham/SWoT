const initialState = []

const WorkoutsHistoryReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'WORKOUTS_HISTORY_GET':
            return action.workoutsHistory
        default:
            return state;
    }
}

export default WorkoutsHistoryReducer