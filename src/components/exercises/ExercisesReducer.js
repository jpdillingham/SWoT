const initialState = {
    api: {
        get: {
            isExecuting: false,
            isErrored: false,
        },
        put: {
            isExecuting: false,
            isErrored: false,
        },
    },
    items: [],
}

const ExercisesReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'EXERCISES_GET':
            return { 
                ...state,
                items: action.items
             }
        case 'EXERCISES_POST':
            return {
                ...state, 
                items: action.status === 201 ? state.items.concat(action.item) : state.items
            }
        case 'EXERCISES_PUT_REQUEST':
            return {
                ...state, api: {
                    ...state.api, put: {
                        ...state.api.put,
                        isExecuting: true,
                    }
                }
            }
        case 'EXERCISES_PUT_RESPONSE':
            return {
                ...state, api: {
                    ...state.api, put: {
                        isExecuting: false,
                        isErrored: action.status === 200 ? false : true,
                    }
                },
                items: action.status === 200 ? state.items.map(e => { 
                    return e.id === action.item.id ? action.item : e
                }) : state.items
            }
        case 'EXERCISES_PUT_RESET':
            return {
                ...state, api: {
                    ...state.api, put: {
                        isExecuting: false,
                        isErrored: false,
                    }
                }
            }
        case 'EXERCISES_DELETE':
            return {
                ...state,
                items: state.items.filter(e => e.id !== action.id)
            }
        default:
            return state;
    }
}

export default ExercisesReducer