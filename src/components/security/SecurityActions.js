import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { COGNITO_POOLID, COGNITO_CLIENTID } from '../../constants'

const loginAction = (user) => ({
    type: 'LOGIN',
    user: user
})

const logoutAction = () => ({
    type: 'LOGOUT'
})

const cognitoUserPool = new CognitoUserPool({ 
    UserPoolId: COGNITO_POOLID, 
    ClientId: COGNITO_CLIENTID 
});

export const login = (user) => (dispatch) => {
    dispatch(loginAction(user));
}

export const logout = () => (dispatch) => {
    dispatch(logoutAction());
}

export const authenticate = (email, password) => (dispatch) => {
    console.log(email, password);
    let cognitoUser = new CognitoUser({
        Username: email,
        Pool: cognitoUserPool,
    })

    let auth = {
        Usernane: email,
        Password: password,
    }

    let authDetails = new AuthenticationDetails(auth);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: function (result) {
                console.log(result);
                resolve(result);
            },
    
            onFailure: function(err) {
                console.log(err);
                reject(err);
            }
        })
    })
}

export const register = (email, password) => (dispatch) => {
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

export const confirm = (email, code) => (dispatch) => {
    let cognitoUser = new CognitoUser({ 
        Username: email, 
        Pool: cognitoUserPool,
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