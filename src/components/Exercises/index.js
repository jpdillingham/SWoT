import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExercizeCard from './ExerciseCard'
import ExerciseAddButton from './ExerciseAddButton'

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

class Exercises extends Component {
    componentWillMount() {
        this.props.getExercises()
    }

    render() {
        return (
            <div>
                <ExerciseAddButton 
                    addExercise={this.props.addExercise} 
                    showSnackbar={this.props.showSnackbar}
                    existingNames={this.props.exercises.map(e => e.name)}
                />
                <div style={styles.grid}>
                    {this.props.exercises.map(e =>  
                        <div key={e.id}>
                            <ExercizeCard 
                                exercise={e} 
                                updateExercise={this.props.updateExercise}
                                deleteExercise={this.props.deleteExercise} 
                                showSnackbar={this.props.showSnackbar} 
                                existingNames={this.props.exercises.map(e => e.name)}
                            />
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
    getExercises: () => {
        dispatch({ type: 'GET_EXERCISES' })
    },
    addExercise: (exercise) => {
        dispatch({ type: 'ADD_EXERCISE', exercise: exercise })
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