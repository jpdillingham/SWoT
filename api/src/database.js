const AWS = require('aws-sdk');
const constants = require('./constants');

AWS.config.update({ region: constants.AWS_REGION });
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', convertEmptyValues: true });

exports.get = (userId, property) => {
    let params = {
        TableName: constants.PRIMARY_TABLE,
        Key: {
            user: userId,
        },
        ProjectionExpression: property,
    };
    
    return dynamoDB.get(params).promise();
}

exports.set = (userId, property, value) => {
    let params = {
        TableName: constants.PRIMARY_TABLE,
        Key: { 
            user: userId
        },
        UpdateExpression: 'SET #property = :value',
        ExpressionAttributeNames: { '#property' : property },
        ExpressionAttributeValues: { ':value': value }        
    } 
    
    return dynamoDB.update(params).promise();  
}

exports.put = (userId, workout) => {
    let params = {
        TableName: constants.HISTORY_TABLE,
        Item: {
            user: userId,
            endTime: workout.endTime,
            workout: workout,
        }
    }
    
    return dynamoDB.put(params).promise();
}

exports.query = (userId, fromTime, toTime, lastEvaluatedKey) => {
    fromTime = Number(fromTime);
    toTime = Number(toTime);
    
    let params = {
        TableName: constants.HISTORY_TABLE,
        KeyConditionExpression: "#user = :user AND endTime BETWEEN :fromTime and :toTime",
        ExpressionAttributeNames:{
            "#user": 'user',
        },
        ExpressionAttributeValues: {
            ":user": userId,
            ":fromTime": fromTime,
            ":toTime": toTime,
        }
    }
    
    // if lastEvaluatedKey is supplied, append it to the params to get
    // the next page of results
    if (lastEvaluatedKey) {
        params.ExclusiveStartKey = lastEvaluatedKey;
    }

    return dynamoDB.query(params).promise();
}

exports.queryAll = (userId, fromTime, toTime, workouts, lastEvaluatedKey) => {
    fromTime = Number(fromTime || 0);
    toTime = Number(toTime || new Date().getTime());
    workouts = workouts || [];

    return new Promise((resolve, reject) => {
        this.query(userId, fromTime, toTime, lastEvaluatedKey)
        .then(data => {
            let items = data && data.Items ? data.Items : [];
            workouts = workouts.concat(items.map(i => i.workout));
            
            if (data.LastEvaluatedKey) {
                this.queryAll(userId, fromTime, toTime, workouts, data.LastEvaluatedKey)
                .then(workouts => resolve(workouts));
            }
            else {
                resolve(workouts);
            }
        })
        .catch((err) => {
            reject(err);
        });            
    })
}