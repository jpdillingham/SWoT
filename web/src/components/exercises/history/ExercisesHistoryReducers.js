const initialState = []

const ExercisesHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EXERCISES_HISTORY_GET':
            return { exercises: action.exercises, totalCount: action.totalCount }
        case 'EXERCISE_HISTORY_GET':
            return state.exercises && state.exercises.find(e => e.id === action.exercise.id) ?
                state.exercises.map(e => {
                    return e.id === action.exercise.id ? action.exercise : w
                }) :
                (state.exercises || []).concat(action.exercise);
        default:
            return state;
    }
}

export default ExercisesHistoryReducer