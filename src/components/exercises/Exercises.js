import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchExercises, addExercise, cancelAddExercise, deleteExercise, updateExercise } from './ExercisesActions'

import ExercizeCard from './ExerciseCard'
import ExerciseAddButton from './ExerciseAddButton'
import CircularProgress from 'material-ui/CircularProgress'
import { red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

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
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    error: {
        color: red500,
        height: 48,
        width: 48,
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
                <ExerciseAddButton />
                { 
                    this.props.exercises.api.get.isExecuting ? <CircularProgress style={styles.progress} /> : 
                        this.props.exercises.api.get.isErrored ? <ActionHighlightOff style={styles.error} /> :
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

const mapStateToProps = (state) => ({
    exercises: state.exercises
})

const mapDispatchToProps = {
    fetchExercises,
    addExercise,
    cancelAddExercise,
    deleteExercise,
    updateExercise
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercises)