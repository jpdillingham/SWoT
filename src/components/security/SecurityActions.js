import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'

import { COGNITO_DATA } from '../../constants'

export const login = (user) => ({
    type: 'LOGIN',
    user: user
})

export const logout = () => ({
    type: 'LOGOUT'
})

export const register = (username, email, password) => (dispatch) => {
    let userPool = new CognitoUserPool(COGNITO_DATA);
    
    let email = {
        Name: 'email',
        Value: email,
    }
    
    let attributeList = [];
    attributeList.push(new CognitoUserAttribute(email));

    return new Promise((resolve, reject) => { 
        userPool.signUp(username, password, attributeList, null, function(err, result) {
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