import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchExercises, addExercise, deleteExercise, updateExercise } from './ExercisesActions'
import { showSnackbar } from '../app/AppActions.js'

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
                    this.props.exercises.api.get.isFetching ? <CircularProgress style={styles.progress} /> : 
                        this.props.exercises.api.get.isErrored ? 'error' :
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
    deleteExercise,
    updateExercise,
    showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercises)