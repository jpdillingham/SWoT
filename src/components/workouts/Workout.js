import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import {Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHistory from 'material-ui/svg-icons/action/history';

import { WORKOUT_AVATAR_COLOR } from '../../constants'

import { fetchWorkouts, updateWorkout } from '../workouts/WorkoutsActions'
import { showSnackbar } from '../app/AppActions';

import WorkoutStepper from './WorkoutStepper';

const initialState = {
    workout: undefined,
    stepIndex: 0,
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

const styles = {
    cardHeader: {
        backgroundColor: WORKOUT_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    fab: {
        margin: 0,
        top: 47,
        right: 20,
        bottom: 'auto',
        left: 'auto',
        position: 'absolute',
        zIndex: 1000,
    },
    stepper: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
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

    handleExerciseChange = (exercise) => {
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
                                <Card zDepth={2} style={styles.card}>
                                    <CardHeader                        
                                        titleStyle={styles.cardTitle}
                                        style={styles.cardHeader}
                                        title={
                                            <span 

                                            >
                                                {this.state.workout.routine.name}
                                            </span>
                                        }
                                        avatar={
                                            <Avatar 
                                                backgroundColor={WORKOUT_AVATAR_COLOR} 
                                                size={32} 
                                                src={<CircularProgress/>} 
                                            />
                                        }
                                    >
                                        <FloatingActionButton 
                                            secondary={false} 
                                            zDepth={2} 
                                            style={styles.fab}
                                            mini={true}
                                            onClick={this.handleHistoryClick}
                                        >
                                            <ActionHistory />
                                        </FloatingActionButton>
                                    </CardHeader>
                                    <CardText style={styles.text}>
                                        <WorkoutStepper
                                            style={styles.stepper}
                                            workout={this.state.workout}
                                            onExerciseChange={this.handleExerciseChange}
                                            onExerciseComplete={this.handleExerciseComplete}
                                        />
                                    </CardText>
                                </Card>
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