import React, { Component } from 'react'

class Routines extends Component {
    render() {
        let exercises = [
            { 
                id: 'c4a10b9d-d5de-434e-bac4-c3a4ff014f82',
                name: 'bench press',
                url: 'https://www.bodybuilding.com/exercises/barbell-bench-press-medium-grip',
                metrics: {
                    weight: {
                        uom: 'lbs',
                        value: '205',
                    },
                    sets: {
                        value: 3
                    },
                    reps: {
                        value: 5
                    }
                } 
            },
            { 
                id: '29d53257-5eca-4083-9019-81dc62425801',
                name: 'squat',
                url: 'https://www.bodybuilding.com/exercises/barbell-full-squat',
                metrics: {
                    weight: {
                        uom: 'lbs',
                        value: '265',
                    },
                    sets: {
                        value: 3
                    },
                    reps: {
                        value: 5
                    }
                } 
            },
            { 
                id: '0f2f3a76-c1a2-4a53-bec9-0f124a1f3b16',
                name: 'running',
                url: 'https://www.bodybuilding.com/exercises/running-treadmill',
                metrics: {
                    distance: {
                        uom: 'miles',
                        value: '1',
                    },
                    time: {
                        uom: 'minutes',
                        value: '10',
                    }
                } 
            },
        ]

        let routines = [
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

        return(
            <div>
                <h1>Routines</h1>
                <ul>
                    {routines.map(r => 
                        <div>
                            <li>{r.name}</li>
                            <ul>
                                {r.exercises.map(e => {
                                    let exercise = exercises.find(ex => ex.id == e.id)

                                    return <li>{exercise.name}</li>
                                })}
                            </ul>
                        </div>
                    )}
                </ul>
            </div>
        )
    }
}

export default Routines