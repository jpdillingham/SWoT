const initialState = []

const RoutinesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ROUTINES_GET':
            return action.routines
        default:
            return state;
    }
}

export default RoutinesReducer