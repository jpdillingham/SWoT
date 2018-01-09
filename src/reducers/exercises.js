export default function exercises(state = [], action) {
    switch (action.type) {
        case 'SET_EXERCISES':
            return action.exercises;
        case 'ADD_EXERCISE':
            return state.concat(action.exercise);
        case 'DELETE_EXERCISE':
            return state.filter(e => e.id !== action.id);
        case 'UPDATE_EXERCISE':
            return state.map(e => { 
                    return e.id === action.exercise.id ? action.exercise : e
                })
        default:
            return state;
    }
}