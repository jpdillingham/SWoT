const initialState = {
    isFetching: false,
    isErrored: false,
    items: []
}

const ExercisesReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'REQUEST_EXERCISES':
            return { 
                ...state, 
                isFetching: true, 
                isErrored: false,
                items: []
            };
        case 'RECEIVE_EXERCISES':
            return { 
                ...state, 
                isFetching: false, 
                isErrored: action.status === 200 ? false : true,
                items: action.items
             }
        case 'ADD_EXERCISE':
            return { 
                ...state,
                items: state.items.concat(action.exercise)
            }
        case 'DELETE_EXERCISE':
            return {
                ...state,
                items: state.items.filter(e => e.id !== action.id)
            }
        case 'UPDATE_EXERCISE':
            return state.map(e => { 
                    return e.id === action.exercise.id ? action.exercise : e
                })
        default:
            return state;
    }
}

export default ExercisesReducer