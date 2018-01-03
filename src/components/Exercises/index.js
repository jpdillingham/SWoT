import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar/AppBar';
import {Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import ExercizeCard from './ExerciseCard'
import ExerciseAddButton from './ExerciseAddButton'

import { EXERCISES } from '../../constants'
import { getGuid } from '../../util'

class Exercises extends Component {
    render() {
        return (
            <div>
                <ExerciseAddButton addExercise={this.props.addExercise}/>
                <div style={styles.grid}>
                    {this.props.exercises.map(e =>  
                        <div>
                            <ExercizeCard exercise={e} delete={() => this.props.deleteExercise(e.id)} snackbar={this.props.showSnackbar} />
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
    },
    showSnackbar: (message) => {
        dispatch({ type: 'SNACKBAR_SHOW', snackbar: { visible: true, message: message ? message : '' }} )
    },
    hideSnackbar: () => {
        dispatch({ type: 'SNACKBAR_HIDE', snackbar: { visible: false, message: '' } })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Exercises)

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
        gridTemplateColumns: 'repeat(auto-fit, 400px)'
    },
    card: {
        margin: 20
    }
}