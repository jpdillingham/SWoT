import React, { Component } from 'react';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar/AppBar';
import {Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import ExercizeCard from './ExerciseCard'

import { EXERCISES } from '../../constants'
import { getGuid } from '../../util'

class Exercises extends Component {
    render() {
        return (
            <div>
                <FloatingActionButton onClick={() => 
                    this.props.addExercise({
                        id: getGuid(),
                        name: prompt('enter name'),
                        type: 'cardio',
                        url: 'url',
                    })} secondary={true} zDepth={4} style={styles.fab}>
                    <ContentAdd />
                </FloatingActionButton>
                <div style={styles.grid}>
                {this.props.exercises.map(e =>  
                    <div>
                        <ExercizeCard exercise={e} delete={() => this.props.deleteExercise(e.id)}>
                        </ExercizeCard>
                    </div>
                )}
                </div>
            </div>
        )
    }
} 

const mapStateToProps = (state, ownProps) => {
    return { exercises: state.exercises }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addExercise: (exercise) => {
        dispatch({ type: 'ADD_EXERCISE', exercise: exercise })
    },
    deleteExercise: (id) => {
        dispatch({ type: 'DELETE_EXERCISE', id: id })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Exercises)

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