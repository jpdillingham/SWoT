const initialState = {
    visible: false,
    message: ''
}

export default function snackbar(state = initialState, action) { 
    switch (action.type) {
        case 'SNACKBAR_SHOW':
            return action.snackbar;
        case 'SNACKBAR_HIDE':
            return { visible: false, message: '' }
        default:
            return state;
    }
}