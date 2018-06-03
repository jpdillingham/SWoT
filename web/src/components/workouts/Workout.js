import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { fetchWorkouts, updateWorkout, deleteWorkout } from './WorkoutsActions'
import { fetchWorkoutHistory, deleteWorkoutHistory } from './history/WorkoutsHistoryActions'
import { showSnackbar } from '../app/AppActions';

import Spinner from '../shared/Spinner'
import WorkoutCard from './WorkoutCard'
import WorkoutReportCard from './WorkoutReportCard'
import schedule from 'material-ui/svg-icons/action/schedule';

const initialState = {
    stepIndex: 0,
    retry: true,
    api: {
        isExecuting: false,
        isErrored: false,
    },
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
        if (!this.getWorkout(nextProps) && this.state.retry) {
            this.setState({ retry: false }, () => {
                this.fetchWorkout();
            })
        }
    }

    getWorkout = (props = this.props) => {
        let workout = props && props.workouts ? props.workouts.find(w => w.id === props.match.params.id) : undefined;
        workout = workout ? workout : props && props.workoutsHistory && props.workoutsHistory.workout ? props.workoutsHistory.workout : undefined;

        return workout;
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

    handleWorkoutHistoryDelete = () => {
        let workout = this.getWorkout(); 

        return new Promise((resolve, reject) => {
            this.props.deleteWorkoutHistory(workout.id)
            .then(response => {
                this.props.showSnackbar('Deleted Workout history for \'' + workout.routine.name + '\'.');
                this.navigate('../');
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error deleting Workout: ' + error);
                reject(error);
            })
        })
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleWorkoutReset = () => {
        let workout = this.getWorkout();

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

    handleWorkoutReschedule = (datetime = { date: undefined, time: undefined}) => {
        let date = datetime.date || new Date();
        let time = datetime.time || new Date();

        let scheduledTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0).getTime();

        let workout = { ...this.getWorkout(), scheduledTime: scheduledTime };
        
        return this.handleWorkoutChange(workout, 'Rescheduled Workout \'' + workout.routine.name + '\' for ' + moment(scheduledTime).calendar() + '.');
    }

    handleWorkoutExerciseChange = (exercise) => {
        let workout = this.getWorkout(); 

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
        let workout = this.getWorkout();

        return new Promise((resolve, reject) => {
            this.props.deleteWorkout(workout.id)
            .then(response => {
                this.props.showSnackbar('Deleted Workout \'' + workout.routine.name + '\'.');
                this.navigate('../');
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error deleting Workout \'' + workout.routine.name + '\'.');
                reject(error);
            })
        })
    }

    render() {
        let workout = this.getWorkout(this.props);

        return (
            this.state.api.isExecuting ? <Spinner size={48}/> : 
                this.state.api.isErrored || workout === undefined ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    workout.endTime === undefined ?
                        <WorkoutCard
                            workout={workout}
                            onWorkoutChange={this.handleWorkoutChange}
                            onExerciseChange={(exercise) => this.handleWorkoutExerciseChange(exercise)}
                            onDelete={this.handleWorkoutDelete}
                            onReset={this.handleWorkoutReset}
                            onReschedule={this.handleWorkoutReschedule}
                        /> :
                        <WorkoutReportCard 
                            workout={workout} 
                            onDelete={this.handleWorkoutHistoryDelete}
                        />
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
    deleteWorkoutHistory,
    showSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)