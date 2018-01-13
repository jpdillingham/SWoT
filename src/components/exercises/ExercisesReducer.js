const initialState = {
    api: {
        get: {
            isFetching: false,
            isErrored: false,
        },
    },
    items: [],
}

const ExercisesReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'EXERCISES_GET_REQUEST':
            return { 
                ...state, 
                api: { 
                    get: { 
                        isFetching: true, 
                        isErrored: false,
                    }
                },
                items: []
            };
        case 'EXERCISES_GET_RESPONSE':
            return { 
                ...state, 
                api: {
                    get: {
                        isFetching: false, 
                        isErrored: action.status === 200 ? false : true,
                    }
                },
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
            return {
                ...state, 
                items: state.items.map(e => { 
                    return e.id === action.exercise.id ? action.exercise : e
                })
            }
        default:
            return state;
    }
}

export default ExercisesReducer