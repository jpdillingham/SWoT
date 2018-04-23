import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AVPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled'
import ImageLens from 'material-ui/svg-icons/image/lens'

import { fetchWorkouts, updateWorkout } from '../workouts/WorkoutsActions'
import { showSnackbar } from '../app/AppActions';

import WorkoutExerciseForm from './WorkoutExerciseForm';

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

    handleStepClick = (index) => {
        console.log(index);
        this.setState({ stepIndex: index })
    }

    handleExerciseComplete = (index) => {
        this.setState({ stepIndex: index + 1 })
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
                                <div>
                                    <span>{this.state.workout.endTime === undefined ? 'ACTIVE' : 'COMPLETE'}</span>
                                    
                                    <Stepper
                                        activeStep={this.state.stepIndex}
                                        linear={false}
                                        orientation={'vertical'}
                                    >
                                        {this.state.workout.routine.exercises.map((exercise, index) =>
                                            <Step key={index}>
                                                <StepButton 
                                                    completed={exercise.endTime !== undefined}
                                                    onClick={() => this.handleStepClick(index)}
                                                    icon={exercise.endTime !== undefined ? 
                                                        <ActionCheckCircle/> :
                                                        exercise.startTime !== undefined ?
                                                            <AVPlayCircleFilled/> :
                                                            <ImageLens/>
                                                    }
                                                >
                                                    {exercise.name}
                                                </StepButton>
                                                <StepContent>
                                                    <WorkoutExerciseForm 
                                                        stepIndex={index}
                                                        exercise={exercise}
                                                        onChange={this.handleExerciseChange}
                                                        onComplete={this.handleExerciseComplete}
                                                    />
                                                </StepContent>
                                            </Step>
                                        )}
                                    </Stepper>
                                </div>
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