import api from '../../api';

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment/workouts';

const workoutsPost = (workout) => ({
    type: 'WORKOUTS_POST',
    workout: workout
})

const workoutsPut = (workout) => ({
    type: 'WORKOUTS_PUT',
    workout: workout
})

const workoutsGet = (workouts) => ({
    type: 'WORKOUTS_GET',
    workouts: workouts
})

const workoutsDelete = (id) => ({
    type: 'WORKOUTS_DELETE',
    id: id
})