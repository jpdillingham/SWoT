import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { fetchWorkouts, updateWorkout } from '../workouts/WorkoutsActions'
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
                    workout: this.props.workouts.find(w => w.id === this.props.match.params.id),
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

    handleWorkoutExerciseChange = (exercise) => {
        return new Promise((resolve, reject) => {
            this.setState({ 
                workout: { 
                    ...this.state.workout, 
                    routine: { 
                        ...this.state.workout.routine,
                        exercises: this.state.workout.routine.exercises.map(e => {
                            return e.sequence === exercise.sequence && e.id === exercise.id ? exercise : e;
                        })
                    } 
                }
            }, () => {
                this.props.updateWorkout(this.state.workout)
                .then(response => {
                    this.props.showSnackbar('Updated Workout')
                    resolve();
                }, error => {
                    reject();
                })
            })
        })
    }

    render() {
        return (
            <div>
                { 
                    this.state.api.isExecuting ? <CircularProgress style={styles.icon} /> : 
                        this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                            this.state.workout === undefined ? <span>Invalid Workout Id.</span> : 
                                this.state.workout.endTime === undefined ?
                                    <WorkoutCard
                                        workout={this.state.workout}
                                        onWorkoutChange={this.handleWorkoutChange}
                                        onExerciseChange={this.handleWorkoutExerciseChange}
                                        onDeleteClick={this.handleDeleteClick}
                                        onResetClick={this.handleResetClick}
                                    /> :
                                    <WorkoutReportCard workout={this.state.workout}/>
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
    showSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)