const initialState = [];

const WorkoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WORKOUTS_GET':
            return action.workouts;
        case 'WORKOUTS_POST':
            return state.concat(action.workout);
        case 'WORKOUTS_PUT': 
            // because updating a workout may result in that workout being
            // moved from the collection into history, we must pass the 
            // updated resource in it's entirety as it is returned by the api.
            return action.workouts;
        case 'WORKOUTS_DELETE':
            return state.filter(w => w.id !== action.id);
        default:
            return state;
    }
};

export default WorkoutsReducer;