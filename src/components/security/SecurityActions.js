import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { COGNITO_POOLID, COGNITO_CLIENTID } from '../../constants'

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

export const register = (email, password) => {
    let cognitoUserPool = new CognitoUserPool({ 
        UserPoolId: COGNITO_POOLID, 
        ClientId: COGNITO_CLIENTID 
    });
    
    return new Promise((resolve, reject) => { 
        cognitoUserPool.signUp(email, password, [], null, function(err, result) {
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

export const confirm = (email, code) => {
    let cognitoUser = new CognitoUser({ 
        Username: email, 
        Pool: COGNITO_POOLID
    })

    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log(result);
                resolve(result);
            }
        });
    })
}