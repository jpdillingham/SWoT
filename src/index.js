import React from 'react'
import ReactDOM from 'react-dom'
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'

import App from './components/App'

ReactDOM.render(
    <App/>, 
    document.getElementById('root')
);

