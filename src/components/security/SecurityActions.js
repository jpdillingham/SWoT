import { 
    CognitoUserPool, 
    CognitoUser, 
    AuthenticationDetails, 
    CognitoUserSession, 
    CognitoAccessToken, 
    CognitoIdToken, 
    CognitoRefreshToken 
} from 'amazon-cognito-identity-js'
import { COGNITO_POOLID, COGNITO_CLIENTID } from '../../constants'

const cognitoUserPool = new CognitoUserPool({ 
    UserPoolId: COGNITO_POOLID, 
    ClientId: COGNITO_CLIENTID 
});

const loginAction = (user, session) => ({
    type: 'LOGIN',
    user: user,
    session: session,
})

const logoutAction = () => ({
    type: 'LOGOUT'
})

export const checkSession = () => (dispatch, getState) => {
    let sessionData = getState().security.session;

    if (sessionData) {
        let accessToken = new CognitoAccessToken({ AccessToken: sessionData.accessToken.jwtToken });
        let idToken = new CognitoIdToken({ IdToken: sessionData.idToken.jwtToken });
        let refreshToken = new CognitoRefreshToken({ RefreshToken: sessionData.refreshToken.token });

        let session = new CognitoUserSession({
            IdToken: idToken,
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            ClockDrift: sessionData.clockDrift
        });

        if (!session.isValid()) {
            dispatch(logoutAction());
        } 
    }
}

export const logout = () => (dispatch, getState) => {
    let cognitoUser = new CognitoUser({
        Username: getState().security.user,
        Pool: cognitoUserPool
    })

    return new Promise((resolve, reject) => {
        cognitoUser.signOut();
        dispatch(logoutAction());
        resolve();
    })
}

export const authenticate = (email, password) => (dispatch) => {
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
                dispatch(loginAction(result.getIdToken().payload.email, result));
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