import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchExercises, addExercise } from './ExercisesActions'

import ExercizeCard from './ExerciseCard'
import ExerciseAddButton from './ExerciseAddButton'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
        gridTemplateColumns: 'repeat(auto-fit, 400px)'
    },
    card: {
        margin: 20
    },
    progress: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}

class Exercises extends Component {
    componentWillMount() {
        this.props.fetchExercises();
    }

    render() {
        return (
            <div>
                <ExerciseAddButton 
                    addExercise={this.props.addExercise} 
                    showSnackbar={this.props.showSnackbar}
                    existingNames={this.props.exercises.items.map(e => e.name)}
                />
                { 
                    this.props.exercises.isFetching ? 
                        <CircularProgress style={styles.progress} /> : 
                        <div style={styles.grid}>
                            {this.props.exercises.items.map(e =>  
                                <div key={e.id}>
                                    <ExercizeCard 
                                        exercise={e} 
                                        updateExercise={this.props.updateExercise}
                                        deleteExercise={this.props.deleteExercise} 
                                        showSnackbar={this.props.showSnackbar} 
                                        existingNames={this.props.exercises.items.map(e => e.name)}
                                    />
                                </div>
                            )}
                        </div>
                }
            </div>
        )
    }
} 

const mapStateToProps = (state, ownProps) => {
    return { 
        exercises: state.exercises
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchExercises: () => {
        dispatch(fetchExercises())
    },
    setExercises: (exercises) => {
        dispatch({ type: 'SET_EXERCISES', exercises: exercises })
    },
    addExercise: (exercise) => {
        dispatch(addExercise(exercise))
    },
    deleteExercise: (id) => {
        dispatch({ type: 'DELETE_EXERCISE', id: id })
    },
    updateExercise: (exercise) => {
        dispatch({ type: 'UPDATE_EXERCISE', exercise: exercise })
    },
    showSnackbar: (message) => {
        dispatch({ type: 'SNACKBAR_SHOW', snackbar: { visible: true, message: message ? message : '' }} )
    },
    hideSnackbar: () => {
        dispatch({ type: 'SNACKBAR_HIDE', snackbar: { visible: false, message: '' } })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Exercises)