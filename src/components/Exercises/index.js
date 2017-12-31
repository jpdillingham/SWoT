import React, { Component } from 'react';

class Exercises extends Component {
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

        return (
            <div>
                <h1>Exercises</h1>
                {exercises.map(e =>  
                    <div>
                        <h3><a href={e.url}>{e.name}</a></h3>
                        <ul>
                            {
                                Object.keys(e.metrics).map((m) => {
                                    let value = e.metrics[m].value
                                    let uom = e.metrics[m].uom
                                    uom = uom ? uom : ''

                                    return <li>{m}: {value + ' ' + uom}</li>
                                })
                            }
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}

export default Exercises