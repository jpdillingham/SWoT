const initialState = []

const RoutinesHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ROUTINES_HISTORY_GET':
            return { routines: action.routines, totalCount: action.totalCount }
        default:
            return state;
    }
}

export default RoutinesHistoryReducer