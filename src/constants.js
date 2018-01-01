export const EXERCISE_TYPES = [ 'weightlifting', 'bodyweight', 'cardio', 'stretching', 'balance' ]

export const EXERCISES = [
    { 
        id: 'c4a10b9d-d5de-434e-bac4-c3a4ff014f82',
        name: 'bench press',
        type: 'weightlifting',
        url: 'https://www.bodybuilding.com/exercises/barbell-bench-press-medium-grip',
        metrics: [
            {
                name: 'weight',
                uom: 'lbs',
            },
            {
                name: 'sets',
            },
            {
                name: 'reps',
            }
        ]
    },
    { 
        id: '29d53257-5eca-4083-9019-81dc62425801',
        name: 'squat',
        type: 'weightlifting',
        url: 'https://www.bodybuilding.com/exercises/barbell-full-squat',
        metrics: [
            {
                name: 'weight',
                uom: 'lbs',
            },
            {
                name: 'sets',
            },
            {
                name: 'reps',
            }
        ] 
    },
    { 
        id: '0f2f3a76-c1a2-4a53-bec9-0f124a1f3b16',
        name: 'running',
        type: 'cardio',
        url: 'https://www.bodybuilding.com/exercises/running-treadmill',
        metrics: [
            {
                name: 'distance',
                uom: 'miles',
            },
            {
                name: 'time',
                uom: 'minutes',
            }
        ]
    },
]

export const ROUTINES = [
    {
        id: 'f5d161a9-4913-4052-bc80-c82643ba7d25',
        name: 'cardio',
        exercises: [
            { id: '0f2f3a76-c1a2-4a53-bec9-0f124a1f3b16' }, // 'running'
        ]
    },
    {
        id: 'f8a39189-0824-4dd6-a621-eb76ea85306d',
        name: 'workout A',
        exercises: [
            { id: 'c4a10b9d-d5de-434e-bac4-c3a4ff014f82' }, // 'bench press'
            { id: '29d53257-5eca-4083-9019-81dc62425801' }, // 'squat'
        ]
    }
]