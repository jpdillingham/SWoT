const initialState = {
    user: undefined
}

const SecurityReducer = (state = initialState, action) => { 
    console.log(action)
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.user };
        case 'LOGOUT':
            return { ...state, user: undefined }
        default:
            return state;
    }
}

export default SecurityReducer