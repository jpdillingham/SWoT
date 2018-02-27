const initialState = {
    user: undefined,
    session: undefined,
}

const SecurityReducer = (state = initialState, action) => { 
    console.log(action)
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.user, session: action.session };
        case 'LOGOUT':
            return { ...state, user: undefined, session: undefined };
        default:
            return state;
    }
}

export default SecurityReducer