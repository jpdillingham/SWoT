const database = require('../database')
const express = require('express');
const util = require('../util')

const router = express.Router();

// pagination - /workouts?limit=N&offset=M
// sort - /workouts?order=<ASC|DESC>
// filter by routine - /workouts?routineId=guid
// filter by date range = /workouts?fromDate=<unix timestamp>&toDate=<unix timestamp>
router.get('/history', (req, res) => {
    let userId = util.getUserId(req);
    let order = req.query && req.query.order ? req.query.order.toLowerCase() : undefined;
    let exerciseId = req.query && req.query.exerciseId ? req.query.exerciseId.toLowerCase() : undefined;
    let limit = req.query && req.query.limit ? req.query.limit : undefined;
    let offset = req.query && req.query.offset ? req.query.offset : undefined;
    let fromTime = req.query && req.query.fromTime ? req.query.fromTime : 0;
    let toTime = req.query && req.query.toTime ? req.query.toTime : new Date().getTime();

    database.queryAll(userId, fromTime, toTime)
    .then(workouts => {
        let exercises = workouts
                        .map(w => w.routine.exercises)
                        .reduce((acc, e) => acc.concat(e))

        if (exerciseId) {
            exercises = exercises.filter(e => e.id === exerciseId);
        }

        res.header('X-Total-Count', exercises.length);

        if (order) {
            if (order === 'asc' || order === 'desc') {
                exercises = exercises.sort(util.sortByEndTime(order))
            }
            else {
                res.status(400);
                res.json('Invalid order predicate \'' + order + '\'; specify ASC or DESC')
            }
        }

        if (offset && limit) {
            exercises = exercises.slice(+offset, +offset + +limit);
        }

        res.status(200);
        res.json(exercises);
    })
    .catch(err => {
        res.status(500);
        res.json(err);
    })
})

router.get('/', (req, res) => {
    let userId = util.getUserId(req);

    database.get(userId, 'exercises')
    .then((data) => {
        let exercises = data && data.Item && data.Item.exercises ? data.Item.exercises : [];
        res.status(200);
        res.json(exercises);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
})

router.post('/', (req, res) => {
    // todo: validate input
    let userId = util.getUserId(req);
    let exercise = req.body;

    database.get(userId, 'exercises')
    .then((data) => {
        let exercises = data && data.Item && data.Item.exercises ? data.Item.exercises : [];
        exercises.push(exercise);
        
        return exercises;
    })
    .then((exercises) => {
        return database.set(userId, 'exercises', exercises);
    })
    .then(() => {
        res.status(201);
        res.json(exercise);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
})

router.put('/:id', (req, res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;
    let exercise = req.body;

    database.get(userId, 'routines')
    .then((data) => {
        let routines = data && data.Item && data.Item.routines ? data.Item.routines : [];

        routines.map((routine) => {
            routine.exercises.map((e) => e.id === id && Object.assign(e, exercise))
        })

        return routines;
    })
    .then((routines) => {
        return database.set(userId, 'routines', routines);
    })
    .then(() => {
        return database.get(userId, 'exercises');
    })
    .then((data) => {
        let exercises = data && data.Item && data.Item.exercises ? data.Item.exercises : [];
        let foundExercise = exercises.find(exercise => exercise.id === id);

        let index = exercises.indexOf(foundExercise);

        exercises[index] = exercise;
        
        return exercises;
    })
    .then((exercises) => {
        return database.set(userId, 'exercises', exercises);
    })
    .then(() => {
        res.status(200);
        res.json(exercise);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
})

router.delete('/:id', (req, res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;

    database.get(userId, 'routines')
    .then((data) => {
        let routines = data && data.Item && data.Item.routines ? data.Item.routines : [];
        
        routines.map((routine) => {
            routine.exercises = routine.exercises.filter(exercise => exercise.id !== id);
        });

        return routines;
    })
    .then((routines) => {
        return database.set(userId, 'routines', routines);
    })
    .then(() => {
        return database.get(userId, 'exercises');
    })
    .then((data) => {
        let exercises = data && data.Item && data.Item.exercises ? data.Item.exercises : [];
        exercises = exercises.filter(exercise => exercise.id !== id);
        
        return exercises;
    })
    .then((exercises) => {
        return database.set(userId, 'exercises', exercises);
    })
    .then((data) => {
        res.status(204);
        res.json();
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
})

module.exports = router;