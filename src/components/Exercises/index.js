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

        return (
            <div>
                <FloatingActionButton secondary={true} zDepth={4} style={styles.fab}>
                    <ContentAdd />
                </FloatingActionButton>
                <div style={styles.grid}>
                {exercises.map(e =>  
                    <div>
                        <ExercizeCard title={e.name} subtitle={e.url} metrics={e.metrics}>
                        </ExercizeCard>
                    </div>
                )}
                </div>
            </div>
        )
    }
}

export default Exercises

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
        gridTemplateColumns: 'repeat(auto-fit, 400px)'
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex: 1000
    },
    card: {
        margin: 20
    }
}