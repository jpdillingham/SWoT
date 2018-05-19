const database = require('../database')
const express = require('express');
const util = require('../util')

const router = express.Router();

const workoutSort = (predicate) => {
    return (a, b) => {
        a = a.endTime;
        b = b.endTime;
        
        if (predicate === 'asc') {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        }
        else { 
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        }
    }
}

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
        if (fromTime && toTime) {
            workouts = workouts.filter(w => w.endTime >= fromTime && w.endTime <= toTime);
        }
        
        if (routineId) {
            workouts = workouts.filter(w => w.routine.id === routineId);
        }

        res.header('X-Total-Count', workouts.length);

        if (order) {
            if (order === 'asc' || order === 'desc') {
                workouts = workouts.sort(workoutSort(order))
            }
            else {
                res.status(400);
                res.json('Invalid order predicate \'' + order + '\'; specify ASC or DESC')
            }
        }

        if (offset && limit) {
            workouts = workouts.slice(+offset, +offset + +limit);
        }

        res.status(200);
        res.json(workouts);
    })
    .catch(err => {
        res.status(500);
        res.json(err);
    })
})

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
    })
})

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
})

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
            return database.set(userId, 'workouts', workouts).then(() => { return workouts });
        }
        else {
            return Promise.all([
                database.set(userId, 'workouts', workouts),
                database.put(userId, workout)
            ]).then(() => { return workouts });
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
})

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
})

module.exports = router;