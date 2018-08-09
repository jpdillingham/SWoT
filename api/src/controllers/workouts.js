const database = require('../database');
const express = require('express');
const util = require('../util');

const router = express.Router();

router.get('/', (req, res) => { 
    let userId = util.getUserId(req);

    database.get(userId, 'workouts')
    .then((data) => {
        let workouts = data && data.Item && data.Item.workouts ? data.Item.workouts : [];

        res.status(200);
        res.json(workouts);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
});

router.get('/:id', (req,res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;

    database.get(userId, 'workouts')
    .then(data => {
        let workouts = data && data.Item && data.Item.workouts ? data.Item.workouts : [];
        let workout = workouts.find(workout => workout.id === id);

        if (workout === undefined) {
            res.status(404);
            res.json();
        }
        else {
            res.status(200);
            res.json(workout);
        }
    })
    .catch(err => {
        res.status(500);
        res.json(err);
    });
});

router.post('/', (req, res) => {
    // todo: validate input
    // todo: coalesce startTime with current time if undefined
    // todo: ensure endTime undefined
    let userId = util.getUserId(req);
    let workout = req.body;

    database.get(userId, 'workouts')
    .then((data) => {
        let workouts = data && data.Item && data.Item.workouts ? data.Item.workouts : [];
        workouts.push(workout);
        
        return workouts;
    })
    .then((workouts) => {
        return database.set(userId, 'workouts', workouts);
    })
    .then(() => {
        res.status(201);
        res.json(workout);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
});

router.put('/:id', (req, res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;
    let workout = req.body;

    database.get(userId, 'workouts')
    .then((data) => {
        let workouts = data && data.Item && data.Item.workouts ? data.Item.workouts : [];
        
        if (!workout.endTime) { // not finished, update it
            let foundworkout = workouts.find(workout => workout.id === id);
            let index = workouts.indexOf(foundworkout);
            workouts[index] = workout;            
        }
        else { // workout complete, remove from workouts table and insert history
            workouts = workouts.filter(workout => workout.id !== id);
        }
        
        return [ workout, workouts ];
    })
    .then(([ workout, workouts ]) => {
        if (!workout.endTime) {
            return database.set(userId, 'workouts', workouts).then(() => { return workouts; });
        }
        else {
            return Promise.all([
                database.set(userId, 'workouts', workouts), // update the primary table to remove the workout
                database.put(userId, workout), // insert the workout into history
            ]).then(() => { return workouts; });
        }
    })
    .then((workouts) => {
        res.status(200);
        res.json(workouts);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
});

router.delete('/:id', (req, res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;

    database.get(userId, 'workouts')
    .then((data) => {
        let workouts = data && data.Item && data.Item.workouts ? data.Item.workouts : [];
        workouts = workouts.filter(workout => workout.id !== id);
        
        console.log('updated', workouts);
        return workouts;
    })
    .then((workouts) => {
        return database.set(userId, 'workouts', workouts);
    })
    .then(() => {
        res.status(204);
        res.json();
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
});

module.exports = router;