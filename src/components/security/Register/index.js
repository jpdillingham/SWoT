import React, { Component } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'

class Register extends Component {
    signup = () => {
        let poolData = {
            UserPoolId: 'us-east-1_OhnX3yEY5',
            ClientId: '18b132av2gkfgl3m793qcgjsd3'
        }
    
        let userPool = new CognitoUserPool(poolData);
        let attributeList = [];
        let dataEmail = {
            Name: 'test',
            Value: 'test@whatnet.us'
        }
    
        let attributeEmail = new CognitoUserAttribute(dataEmail);

        //attributeList.push(attributeEmail);

        userPool.signUp('cognitotest@whatnet.us', 'Password1@', attributeList, null, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result.user);
            }
        })
    }
}