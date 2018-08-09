const database = require('../database');
const express = require('express');
const util = require('../util');

const router = express.Router();

router.get('/history', (req, res) => { res.redirect('../workouts/history'); });

router.get('/', (req, res) => { 
    let userId = util.getUserId(req);

    database.get(userId, 'routines')
    .then((data) => {
        let routines = data && data.Item && data.Item.routines ? data.Item.routines : [];
        res.status(200);
        res.json(routines);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
});

router.post('/', (req, res) => {
    // todo: validate input
    let userId = util.getUserId(req);
    let routine = req.body;

    database.get(userId, 'routines')
    .then((data) => {
        let routines = data && data.Item && data.Item.routines ? data.Item.routines : [];
        routines.push(routine);
        
        return routines;
    })
    .then((routines) => {
        return database.set(userId, 'routines', routines);
    })
    .then(() => {
        res.status(201);
        res.json(routine);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
});

router.put('/:id', (req, res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;
    let routine = req.body;

    database.get(userId, 'routines')
    .then((data) => {
        let routines = data && data.Item && data.Item.routines ? data.Item.routines : [];
        let foundRoutine = routines.find(routine => routine.id === id);

        let index = routines.indexOf(foundRoutine);

        routines[index] = routine;
        
        return routines;
    })
    .then((routines) => {
        return database.set(userId, 'routines', routines);
    })
    .then(() => {
        res.status(200);
        res.json(routine);
    })
    .catch((err) => {
        res.status(500);
        res.json(err);
    });
});

router.delete('/:id', (req, res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;

    database.get(userId, 'routines')
    .then((data) => {
        let routines = data && data.Item && data.Item.routines ? data.Item.routines : [];
        routines = routines.filter(routine => routine.id !== id);
        return routines;
    })
    .then((routines) => {
        return database.set(userId, 'routines', routines);
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