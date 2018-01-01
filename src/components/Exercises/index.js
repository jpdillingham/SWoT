import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar/AppBar';
import {Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import ExercizeCard from './ExerciseCard'

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
                    },
                    sets: {
                    },
                    reps: {
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
                    },
                    sets: {
                    },
                    reps: {
                    }
                } 
            },
            { 
                id: '0f2f3a76-c1a2-4a53-bec9-0f124a1f3b16',
                name: 'running',
                url: 'https://www.bodybuilding.com/exercises/running-treadmill',
                metrics: {
                    distance: {
                        uom: 'miles'
                    },
                    time: {
                        uom: 'minutes'
                    }
                } 
            },
        ]

        return (
            <div>
                <FloatingActionButton secondary={true} zDepth={4} style={styles.fab}>
                    <ContentAdd />
                </FloatingActionButton>
                {exercises.map(e =>  
                    <div>
                        <ExercizeCard title={e.name} subtitle={e.url} metrics={e.metrics}>
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
                        </ExercizeCard>
                    </div>
                )}
            </div>
        )
    }
}

export default Exercises

const styles = {
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    card: {
        margin: 20
    }
}