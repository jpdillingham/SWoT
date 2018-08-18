import { 
    CognitoUserPool, 
    CognitoUser, 
    AuthenticationDetails, 
    CognitoUserSession, 
    CognitoAccessToken, 
    CognitoIdToken, 
    CognitoRefreshToken, 
} from 'amazon-cognito-identity-js';
import { COGNITO_POOLID, COGNITO_CLIENTID } from '../../constants';

const loginAction = (user, session) => ({
    type: 'LOGIN',
    user: user,
    session: session,
});

const refreshAction = (session) => ({
    type: 'REFRESH',
    session: session,
});

const logoutAction = () => ({
    type: 'LOGOUT',
});

const getCognitoUserPool = () => {
    return new CognitoUserPool({ 
        UserPoolId: COGNITO_POOLID, 
        ClientId: COGNITO_CLIENTID, 
    });
};

const getCognitoUser = (email) => {
    return new CognitoUser({
        Username: email,
        Pool: getCognitoUserPool(),
    });
};

export const ensureSession = () => (dispatch, getState) => {
    let sessionData = getState().security.session;

    return new Promise((resolve, reject) => {
        if (sessionData) {
            let accessToken = new CognitoAccessToken({ AccessToken: sessionData.accessToken.jwtToken });
            let idToken = new CognitoIdToken({ IdToken: sessionData.idToken.jwtToken });
            let refreshToken = new CognitoRefreshToken({ RefreshToken: sessionData.refreshToken.token });
    
            let session = new CognitoUserSession({
                IdToken: idToken,
                AccessToken: accessToken,
                RefreshToken: refreshToken,
                ClockDrift: sessionData.clockDrift,
            });
    
            if (!session.isValid()) {
                dispatch(refreshSession()).then((result) => {
                    resolve(result);
                }, error => {
                    dispatch(logoutAction());
                    reject(error.response.message);
                });
            }
            else {
                resolve(true);
            }
        }
        else {
            dispatch(logoutAction());
            reject('Invalid session');
        }
    });
};

export const refreshSession = () => (dispatch, getState) => {
    let cognitoUser = getCognitoUser(getState().security.user);
    let sessionData = getState().security.session;
    let refreshToken = new CognitoRefreshToken({ RefreshToken: sessionData.refreshToken.token });

    return new Promise((resolve, reject) => {
        cognitoUser.refreshSession(refreshToken, function(err, result) {
            if (err) {
                dispatch(logoutAction());
                reject(err);
            }
            else {
                dispatch(refreshAction(result));
                resolve(result);
            }
        });
    });
};



export const logout = () => (dispatch, getState) => {
    let cognitoUser = getCognitoUser(getState().security.user);

    return new Promise((resolve, reject) => {
        if (cognitoUser) {
            cognitoUser.signOut();
        }

        dispatch(logoutAction());
        resolve();
    });
};

export const authenticate = (email, password) => (dispatch) => {
    let cognitoUser = getCognitoUser(email);

    let auth = {
        Usernane: email,
        Password: password,
    };

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
            },
        });
    });
};

export const register = (email, password) => (dispatch) => {
    let cognitoUserPool = getCognitoUserPool();

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
        });
    });
};

export const confirm = (email, code) => (dispatch) => {
    let cognitoUser = getCognitoUser(email);

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
    });
};