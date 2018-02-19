import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { COGNITO_DATA } from '../../constants'

const loginAction = (user) => ({
    type: 'LOGIN',
    user: user
})

const logoutAction = () => ({
    type: 'LOGOUT'
})

export const login = (user) => (dispatch) => {
    dispatch(loginAction(user));
}

export const logout = () => (dispatch) => {
    dispatch(logoutAction());
}

export const register = (username, password) => (dispatch) => {
    let userPool = new CognitoUserPool(COGNITO_DATA);
    
    return new Promise((resolve, reject) => { 
        userPool.signUp(username, password, [], null, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log(result);
                resolve(result);
            }
        })
    })
}