const initialState = [];

const ExercisesHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EXERCISES_HISTORY_GET':
            return { exercises: action.exercises, totalCount: action.totalCount };
        case 'EXERCISES_HISTORY_CLEAR':
            return { exercises: [], totalCount: 0 };
        default:
            return state;
    }
};

export default ExercisesHistoryReducer;