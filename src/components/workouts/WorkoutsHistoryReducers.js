const initialState = []

const WorkoutsHistoryReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'WORKOUTS_HISTORY_GET':
            return { workouts: action.workouts, filters: action.filters }
        default:
            return state;
    }
}

export default WorkoutsHistoryReducer