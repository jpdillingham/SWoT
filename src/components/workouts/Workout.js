import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { fetchWorkouts, updateWorkout, deleteWorkout } from '../workouts/WorkoutsActions'
import { fetchWorkoutHistory } from '../workouts/WorkoutsHistoryActions'
import { showSnackbar } from '../app/AppActions';

import Spinner from '../shared/Spinner'
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
                workout: response.data.find(w => w.id === this.props.match.params.id),
            }, () => {
                if (!this.state.workout) {
                    this.props.fetchWorkoutHistory(this.props.match.params.id)
                    .then(response => {
                        this.setState({
                            workout: response.data,
                            api: { isExecuting: false, isErrored: false }
                        })
                    })
                }
                else {
                    this.setState({ api: { isExecuting: false, isErrored: false }})
                }
            })
        }, error => {
            this.setState({ api: { isExecuting: false, isErrored: true }})
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ workout: nextProps.workouts.find(w => w.id === this.props.match.params.id) })
    }

    handleWorkoutChange = (workout, notify = { show: false, caption: ''}) => {
        return new Promise((resolve, reject) => {
            this.props.updateWorkout(workout)
            .then(response => {
                if (notify.show) {
                    this.props.showSnackbar(notify.caption);
                }

                resolve(response);
            }, error => {
                this.props.showSnackbar('Error updating Workout')
                reject(error);
            })
        })
    }

    handleWorkoutDelete = (workout) => {
        return new Promise((resolve, reject) => {
            this.props.deleteWorkout(workout.id)
            .then(response => {
                this.props.showSnackbar('Deleted Workout');
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error deleting Workout');
                reject(error);
            })
        })
    }

    handleWorkoutReset = (workout, notify = { show: false, caption: ''}) => {
        delete workout.startTime;
        delete workout.endTime;
        delete workout.notes;

        workout.routine.exercises.forEach(e => {
            delete e.startTime;
            delete e.endTime;
            delete e.notes;

            e.metrics.forEach(m => {
                delete m.value;
            });
        });

        return this.handleWorkoutChange(workout, notify);
    }

    handleWorkoutExerciseChange = (workout, exercise, notify = { show: false, caption: ''}) => {
        workout.routine.exercises = workout.routine.exercises.map(e => {
            return e.sequence === exercise.sequence && e.id === exercise.id ? exercise : e;
        });

        return this.handleWorkoutChange(workout, notify);
    }

    render() {
        let workout = this.state.workout;

        return (
            this.state.api.isExecuting ? <Spinner size={48}/> : 
                this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    workout === undefined ? <span>Invalid Workout Id.</span> : 
                        workout.endTime === undefined ?
                            <WorkoutCard
                                workout={workout}
                                onWorkoutChange={this.handleWorkoutChange}
                                onExerciseChange={(exercise) => this.handleWorkoutExerciseChange(workout, exercise)}
                                onDelete={() => this.handleWorkoutDelete(workout)}
                                onReset={() => this.handleWorkoutReset(workout)}
                            /> :
                            <WorkoutReportCard workout={workout}/>
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
    fetchWorkoutHistory,
    showSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)