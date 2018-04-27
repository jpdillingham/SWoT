import React, { Component } from 'react';

import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AVPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled'
import ImageLens from 'material-ui/svg-icons/image/lens'

import WorkoutExerciseForm from './WorkoutExerciseForm'

const initialState = {
    stepIndex: 0,
}

class WorkoutStepper extends Component {
    state = initialState;

    handleStepClick = (index) => {
        this.setState({ stepIndex: index })
    }

    handleExerciseComplete = () => {
        this.setState({ stepIndex: this.state.stepIndex + 1 })
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
                                exercise={exercise}
                                onChange={this.props.onExerciseChange}
                                onComplete={this.handleExerciseComplete}
                            />
                        </StepContent>
                    </Step>
                )}
            </Stepper>
        )
    }
}

export default WorkoutStepper