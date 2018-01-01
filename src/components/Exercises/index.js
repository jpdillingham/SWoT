import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar/AppBar';
import {Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import ExercizeCard from './ExerciseCard'

import { EXERCISES } from '../../constants'

class Exercises extends Component {
    render() {
        return (
            <div>
                <FloatingActionButton secondary={true} zDepth={4} style={styles.fab}>
                    <ContentAdd />
                </FloatingActionButton>
                <div style={styles.grid}>
                {EXERCISES.map(e =>  
                    <div>
                        <ExercizeCard exercise={e}>
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