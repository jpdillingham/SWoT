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
    let routineId = req.query && req.query.routineId ? req.query.routineId.toLowerCase() : undefined;
    let limit = req.query && req.query.limit ? req.query.limit : undefined;
    let offset = req.query && req.query.offset ? req.query.offset : undefined;
    let fromTime = req.query && req.query.fromTime ? req.query.fromTime : 0;
    let toTime = req.query && req.query.toTime ? req.query.toTime : new Date().getTime();

    database.queryAll(userId, fromTime, toTime)
    .then(workouts => {
        let routines = workouts
                        .map(w => w.routine)

        if (routineId) {
            routines = routines.filter(r => r.id === routineId);
        }

        res.header('X-Total-Count', routines.length);

        if (order) {
            if (order === 'asc' || order === 'desc') {
                routines = routines.sort(util.sortByEndTime(order))
            }
            else {
                res.status(400);
                res.json('Invalid order predicate \'' + order + '\'; specify ASC or DESC')
            }
        }

        if (offset && limit) {
            routines = routines.slice(+offset, +offset + +limit);
        }

        res.status(200);
        res.json(routines);
    })
    .catch(err => {
        res.status(500);
        res.json(err);
    })
})

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

router.get('/history', (req, res) => { res.redirect('../workouts/history') });

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
})

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
})

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
})

module.exports = router;