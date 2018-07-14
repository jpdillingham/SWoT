import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { fetchWorkouts, updateWorkout, deleteWorkout } from './WorkoutsActions'
import { fetchWorkoutHistory, deleteWorkoutHistory, updateWorkoutHistory } from './history/WorkoutsHistoryActions'
import { setTitle, showSnackbar } from '../app/AppActions';

import Spinner from '../shared/Spinner'
import WorkoutCard from './WorkoutCard'
import WorkoutReportCard from './report/WorkoutReportCard'

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
        this.props.setTitle('Workout');
        this.fetchWorkout();
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

        return this.props.fetchWorkouts()
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
                this.props.showSnackbar('Error deleting Workout history: ' + error);
                reject(error);
            })
        })
    }

    handleWorkoutHistoryChange= (workout) => {
        return new Promise((resolve, reject) => {
            this.props.updateWorkoutHistory(workout)
            .then(response => {
                this.props.showSnackbar('Updated Workout history for \'' + workout.routine.name + '\'.');
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error updating Workout history: ' + error);
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

            if (e.originalSequence !== undefined) {
                e.sequence = e.originalSequence;
                delete e.originalSequence;
            }

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

    handleWorkoutComplete = (workout) => {
        return new Promise((resolve, reject) => {
            this.props.updateWorkout({ ...workout, endTime: new Date().getTime() })
            .then(response => {
                this.props.showSnackbar('Completed Workout \'' + workout.routine.name + '\'.');
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error completing Workout \'' + workout.routine.name + '\'.');
                reject(error);
            })
            .then(() => this.fetchWorkout());
        })
    }

    handleWorkoutStart = (workout) => {
        return new Promise((resolve, reject) => {
            this.props.updateWorkout({ ...workout, startTime: new Date().getTime() })
            .then(response => {
                this.props.showSnackbar('Started Workout \'' + workout.routine.name + '\'.');
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error starting Workout \'' + workout.routine.name + '\'.');
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
                            onExerciseChange={this.handleWorkoutExerciseChange}
                            onDelete={this.handleWorkoutDelete}
                            onReset={this.handleWorkoutReset}
                            onReschedule={this.handleWorkoutReschedule}
                            onComplete={this.handleWorkoutComplete}
                            onStart={this.handleWorkoutStart}
                        /> :
                        <WorkoutReportCard 
                            workout={workout} 
                            onDelete={this.handleWorkoutHistoryDelete}
                            onChange={this.handleWorkoutHistoryChange}
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
    updateWorkoutHistory,
    showSnackbar,
    setTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)