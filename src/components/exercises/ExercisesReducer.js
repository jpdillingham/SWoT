const initialState = {
    api: {
        get: {
            isExecuting: false,
            isErrored: false,
        },
        post: {
            isExecuting: false,
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
                    ...state.api,
                    get: { 
                        isExecuting: true, 
                        isErrored: false,
                    }
                },
                items: []
            };
        case 'EXERCISES_GET_RESPONSE':
            return { 
                ...state, 
                api: {
                    ...state.api,
                    get: {
                        isExecuting: false, 
                        isErrored: action.status === 200 ? false : true,
                    }
                },
                items: action.items
             }
        case 'EXERCISES_POST_REQUEST':
            return { 
                ...state,
                api: {
                    ...state.api,
                    post: {
                        isExecuting: true,
                        isErrored: false,
                    }
                }
            }
        case 'EXERCISES_POST_RESPONSE':
            return {
                ...state,
                api: {
                    ...state.api,
                    post: {
                        isExecuting: false,
                        isErrored: action.status === 200 ? false : true,
                    }
                },
                items: action.status === 200 ? state.items.concat(action.item) : state.items
            }
        case 'EXERCISES_POST_RESET': 
            return {
                ...state,
                api: {
                    ...state.api,
                    post: {
                        isExecuting: false,
                        isErrored: false
                    }
                }
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