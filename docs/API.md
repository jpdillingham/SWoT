# API

The following describes the API endpoints offered by the application.

Alternatively, a swagger definition file is available in this repository [here](https://github.com/jpdillingham/SWoT/blob/master/web/public/swagger.yaml), or via the `/swagger.yaml` route in the application.

# Security

Application security is handled through [AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-reference.html).  Refer to the official Cognito documentation for implementation details, or review the [security action](https://github.com/jpdillingham/SWoT/blob/master/web/src/components/security/SecurityActions.js) implementation to see how authentication is handled natively.

# Exercises

|Verb|Route|Body|Response|Status|
|----|-----|----|--------|------|
|GET|/exercises|N/A|[Exercise[]](https://github.com/jpdillingham/SWoT/blob/master/docs/DOMAIN.md)|200|
|POST|/exercises|Exercise|Exercise|201|
|PUT|/exercises/{id}|Exercise|Exercise|200|
|DELETE|/exercises/{id}|N/A|N/A|204|
|GET|/exercises/history/{id?}|N/A|Exercise[]|200|

Exercise history is available via the `/exercises/history` route and accepts an optional `id` parameter.  If specified, only records for the matching Exercise are returned.  

The history route accepts the following query parameters.

|Parameter|Value(s)|Effect|
|---------|--------|------|
|?order=|asc\|desc|Sorts the resulting array by end time|
|?limit=|int|Limits the number of returned array elements|
|?offset=|int|Used with limit, defines the starting element of the return array|
|?fromTime=|unix timestamp|Filters results ending earlier than the given time|
|?toTime=|unix timestamp|Filters results ending later than the given time|

# Routines

|Verb|Route|Body|Response|Status|
|----|-----|----|--------|------|
|GET|/routines|N/A|[Routine[]](https://github.com/jpdillingham/SWoT/blob/master/docs/DOMAIN.md)|200|
|POST|/routines|Routine|Routine|201|
|PUT|/routines/{id}|Routine|Routine|200|
|DELETE|/routines/{id}|N/A|N/A|204|
|GET|/routines/history|N/A|Redirect to /workouts/history|307|

# Workouts

|Verb|Route|Body|Response|Status|
|----|-----|----|--------|------|
|GET|/workouts|N/A|[Workout[]](https://github.com/jpdillingham/SWoT/blob/master/docs/DOMAIN.md)|200|
|GET|/workouts/{id}|N/A|Workout|200|
|POST|/workouts|Workout|Workout|201|
|PUT|/workouts/{id}|Workout|Workout[]|200|
|DELETE|/workouts/{id}|N/A|N/A|204|

A PUT request with a body containing a Workout with a non-null `endTime` will result in that Workout being removed from the collection of Workouts and moved to WorkoutsHistory.

# Workout History

|Verb|Route|Body|Response|Status|
|----|-----|----|--------|------|
|GET|/workouts/history|N/A|[Workout[]](https://github.com/jpdillingham/SWoT/blob/master/docs/DOMAIN.md)|200|
|GET|/workouts/history/{id}|N/A|Workout|200|
|PUT|/workouts/history/{id}|Workout|Workout|200|
|DELETE|/workouts/history/{id}|N/A|N/A|204|

The GET request on the `/workouts/history` route accepts the following query parameters.

|Parameter|Value(s)|Effect|
|---------|--------|------|
|?routineId=|guid|Filters results by Routine|
|?order=|asc\|desc|Sorts the resulting array by end time|
|?limit=|int|Limits the number of returned array elements|
|?offset=|int|Used with limit, defines the starting element of the return array|
|?fromTime=|unix timestamp|Filters results ending earlier than the given time|
|?toTime=|unix timestamp|Filters results ending later than the given time|