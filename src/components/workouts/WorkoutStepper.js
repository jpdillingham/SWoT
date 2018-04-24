import React, { Component } from 'react';

import {Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import ActionHistory from 'material-ui/svg-icons/action/history';
import Avatar from 'material-ui/Avatar';

import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AVPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled'
import ImageLens from 'material-ui/svg-icons/image/lens'

import WorkoutExerciseForm from './WorkoutExerciseForm'

import SaveRetryFlatButton from '../shared/SaveRetryFlatButton';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import FlatButton from 'material-ui/FlatButton/FlatButton';

const styles = { }

const initialState = {
    stepIndex: 0,
}

class WorkoutStepper extends Component {
    state = initialState;

    handleStepClick = (index) => {
        this.setState({ stepIndex: index })
    }

    render() {
        return (
            <Stepper
                activeStep={this.state.stepIndex}
                linear={false}
                orientation={'vertical'}
            >
                {this.props.workout.routine.exercises.map((exercise, index) =>
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
                                onChange={this.props.onExerciseChange}
                                onComplete={this.props.onExerciseComplete}
                            />
                        </StepContent>
                    </Step>
                )}
            </Stepper>
        )
    }
}

export default WorkoutStepper