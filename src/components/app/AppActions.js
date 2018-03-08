export const showSnackbar = (message) => ({
    type: 'SNACKBAR_SHOW',
    message: message
})

export const hideSnackbar = () => ({
    type: 'SNACKBAR_HIDE'
})

export const noop = () => ({
    type: 'NOOP'
})