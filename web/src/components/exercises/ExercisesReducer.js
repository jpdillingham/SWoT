const initialState = [];

const ExercisesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EXERCISES_GET':
            return action.exercises;
        case 'EXERCISES_POST':
            return state.concat(action.exercise);
        case 'EXERCISES_PUT':
            return state.map(e => { 
                    return e.id === action.exercise.id ? action.exercise : e;
                });
        case 'EXERCISES_DELETE':
            return state.filter(e => e.id !== action.id);
        default:
            return state;
    }
};

export default ExercisesReducer;