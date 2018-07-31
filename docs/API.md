# API

The following describes the API endpoints offered by the application.

Alternatively, a swagger definition file is available in this repository [here](https://github.com/jpdillingham/SWoT/blob/master/web/public/swagger.yaml), or via the `/swagger.yaml` route in the application.

# Security

Application security is handled through [AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-reference.html).  Refer to the official Cognito documentation for implementation details, or review the [security action](https://github.com/jpdillingham/SWoT/blob/master/web/src/components/security/SecurityActions.js) implementation to see how authentication is handled natively.

# Exercises

|Verb|Route|Body|Response|
|----|-----|Body|--------|
|GET |/exercises|N/A|[Exercise[]](https://github.com/jpdillingham/SWoT/blob/master/docs/DOMAIN.md)|
|

# Routines

# Workouts

# Workout History