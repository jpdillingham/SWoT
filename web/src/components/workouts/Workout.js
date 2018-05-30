import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { fetchWorkouts, updateWorkout, deleteWorkout } from './WorkoutsActions'
import { fetchWorkoutHistory } from './history/WorkoutsHistoryActions'
import { showSnackbar } from '../app/AppActions';

import Spinner from '../shared/Spinner'
import WorkoutCard from './WorkoutCard'
import WorkoutReportCard from './WorkoutReportCard'

const initialState = {
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
        this.fetchWorkout();
    }

    componentWillReceiveProps = (nextProps) => {
        if (!this.getWorkout()) {
            this.fetchWorkout();
        }
    }

    fetchWorkout = () => {
        this.setState({ 
            api: { ...this.state.api, isExecuting: true }}
        )

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
                        });
                    }, error => {
                        this.props.showSnackbar('Error fetching Workout history: ' + error);
                        this.setState({ api: { isExecuting: false, isErrored: true }});
                    })
                }
                else {
                    this.setState({ api: { isExecuting: false, isErrored: false }});
                }
            })
        }, error => {
            this.props.showSnackbar('Error fetching Workouts: ' + error);
            this.setState({ api: { isExecuting: false, isErrored: true }});
        });
    }

    handleWorkoutReset = () => {
        let workout = this.state.workout;

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

        return this.handleWorkoutChange(workout, 'Reset Workout \'' + workout.routine.name + '\'.');
    }

    handleWorkoutExerciseChange = (exercise) => {
        let workout = this.state.workout; 

        workout.routine.exercises = workout.routine.exercises.map(e => {
            return e.sequence === exercise.sequence && e.id === exercise.id ? exercise : e;
        });

        return this.handleWorkoutChange(workout);
    }

    handleWorkoutChange = (workout, notify = undefined) => {
        return new Promise((resolve, reject) => {
            this.props.updateWorkout(workout)
            .then(response => {
                if (notify) {
                    this.props.showSnackbar(notify);
                }

                resolve(response);
            }, error => {
                this.props.showSnackbar('Error updating Workout \'' + workout.routine.name + '\'.');
                reject(error);
            })
        })
    }

    handleWorkoutDelete = () => {
        let workout = this.state.workout;

        return new Promise((resolve, reject) => {
            this.props.deleteWorkout(workout.id)
            .then(response => {
                this.props.showSnackbar('Deleted Workout \'' + workout.routine.name + '\'.');
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error deleting Workout \'' + workout.routine.name + '\'.');
                reject(error);
            })
        })
    }

    getWorkout = () => {
        let workout = this.props.workouts.find(w => w.id === this.props.match.params.id);
        workout = workout ? workout : this.props.workoutsHistory ? this.props.workoutsHistory.workout : undefined;

        return workout;
    }

    render() {
        let workout = this.getWorkout();

        return (
            this.state.api.isExecuting ? <Spinner size={48}/> : 
                this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    workout === undefined ? <span>Invalid Workout Id.</span> : 
                        workout.endTime === undefined ?
                            <WorkoutCard
                                workout={workout}
                                onWorkoutChange={this.handleWorkoutChange}
                                onExerciseChange={(exercise) => this.handleWorkoutExerciseChange(exercise)}
                                onDelete={this.handleWorkoutDelete}
                                onReset={this.handleWorkoutReset}
                            /> :
                            <WorkoutReportCard workout={workout}/>
        )
    }
}

const mapStateToProps = (state) => ({
    workouts: state.workouts,
    workoutsHistory: state.workoutsHistory,
})

const mapDispatchToProps = {
    fetchWorkouts,
    updateWorkout,
    deleteWorkout,
    fetchWorkoutHistory,
    showSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)