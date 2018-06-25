export const showSnackbar = (message) => ({
    type: 'SNACKBAR_SHOW',
    message: message,
});

export const hideSnackbar = () => ({
    type: 'SNACKBAR_HIDE',
});

export const noop = () => ({
    type: 'NOOP',
});

export const setTitle = (title) => ({
    type: 'SET_TITLE',
    title: title,
});

export const setVariable = (name, value) => ({
    type: 'SET_VARIABLE',
    name: name,
    value: value,
});