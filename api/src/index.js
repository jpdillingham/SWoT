const AWS = require('aws-sdk');
const awsServerlessExpress = require('aws-serverless-express');  
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const express = require('express');  
const cors = require('cors');
const bodyParser = require('body-parser'); 

const util = require('./util')

const exercises = require('./controllers/exercises')
const routines = require('./controllers/routines')
const workouts = require('./controllers/workouts')

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors({ exposedHeaders: 'X-Total-Count' }));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/exercises', exercises);
app.use('/routines', routines);
app.use('/workouts', workouts);

app.listen(3000, () => console.log('Listening on port 3000.')); // ignored by lambda

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);