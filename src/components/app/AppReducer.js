const initialState = {
    snackbar: {
        visible: false,
        message: ''
    }
}

const AppReducer = (state = initialState, action) => { 
    switch (action.type) {
        case 'SNACKBAR_SHOW':
            return { ...state, snackbar: { visible: true, message: action.message } };
        case 'SNACKBAR_HIDE':
            return { ...state, snackbar: { visible: false, message: '' } }
        default:
            return state;
    }
}

export default AppReducer