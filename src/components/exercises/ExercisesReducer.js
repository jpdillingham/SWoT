const initialState = {
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
                items: state.items.concat(action.item)
            }
        case 'EXERCISES_PUT':
            return {
                ...state,
                items: state.items.map(e => { 
                    return e.id === action.item.id ? action.item : e
                })
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