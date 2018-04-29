import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { fetchWorkouts, updateWorkout, deleteWorkout } from '../workouts/WorkoutsActions'
import { showSnackbar } from '../app/AppActions';

import WorkoutCard from './WorkoutCard'
import WorkoutReportCard from './WorkoutReportCard'

const initialState = {
    workout: undefined,
    stepIndex: 0,
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

const styles = {
    icon: {
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

class Workout extends Component {
    state = initialState;

    componentWillMount = () => {
        this.setState({ api: { ...this.state.api, isExecuting: true }})
        
        this.props.fetchWorkouts()
        .then(response => {
            this.setState({ 
                api: { isExecuting: false, isErrored: false }
            })
        }, error => {
            this.setState({ api: { isExecuting: false, isErrored: true }})
        })
    }

    handleWorkoutChange = (workout) => {
        this.props.updateWorkout(workout)
        .then(response => {
            this.props.showSnackbar('Updated Workout')
        }, error => {
            this.props.showSnackbar('Error updating Workout')
        })
    }

    handleWorkoutDeleteClick = (id) => {
        this.props.deleteWorkout(id)
        .then(response => {
            this.props.showSnackbar('Deleted Workout')
        }, error => {
            this.props.showSnackbar('Error deleting Workout')
        })
    }

    handleWorkoutExerciseChange = (workout, exercise) => {
        workout.routine.exercises = workout.routine.exercises.map(e => {
            return e.sequence === exercise.sequence && e.id === exercise.id ? exercise : e;
        });

        return new Promise((resolve, reject) => {
            this.props.updateWorkout(workout)
            .then(response => {
                this.props.showSnackbar('Updated Workout')
                resolve();
            }, error => {
                reject();
            })
        })
    }

    render() {
        let workout = this.props.workouts.find(w => w.id === this.props.match.params.id)

        return (
            <div>
                { 
                    this.state.api.isExecuting ? <CircularProgress style={styles.icon} /> : 
                        this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                            workout === undefined ? <span>Invalid Workout Id.</span> : 
                                workout.endTime === undefined ?
                                    <WorkoutCard
                                        workout={workout}
                                        onWorkoutChange={this.handleWorkoutChange}
                                        onExerciseChange={(exercise) => this.handleWorkoutExerciseChange(workout, exercise)}
                                        onDeleteClick={() => this.handleWorkoutDeleteClick(workout.id)}
                                        onResetClick={this.handleResetClick}
                                    /> :
                                    <WorkoutReportCard workout={workout}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    workouts: state.workouts
})

const mapDispatchToProps = {
    fetchWorkouts,
    updateWorkout,
    deleteWorkout,
    showSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)