const initialState = [];

const RoutinesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ROUTINES_GET':
            return action.routines;
        case 'ROUTINES_POST':
            return state.concat(action.routine);
        case 'ROUTINES_PUT': 
            return state.map(r => {
                return r.id === action.routine.id ? action.routine : r;
            });
        case 'ROUTINES_DELETE':
            return state.filter(r => r.id !== action.id);
        default:
            return state;
    }
};

export default RoutinesReducer;