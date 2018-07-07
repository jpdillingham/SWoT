import React, { Component } from 'react';

import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AVPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled'
import { NavigationArrowUpward, NavigationArrowDownward } from 'material-ui/svg-icons';
import ImageLens from 'material-ui/svg-icons/image/lens'

import ExerciseForm from '../exercises/ExerciseForm'

const initialState = {
    stepIndex: -1,
    hoverId: undefined,
}

class WorkoutStepper extends Component {
    state = initialState;

    handleStepClick = (index) => {
        this.setState({ stepIndex: index })
    }

    handleExerciseComplete = () => {
        this.setState({ stepIndex: this.getNextExerciseIndex() })
    }

    handleStepMouseEnter = (exercise) => {
        this.setState({ hoverId: exercise.sequence })
    }

    handleStepMouseLeave = (exercise) => {
        this.setState({ hoverId: undefined })
    }

    componentDidMount = () => {
        this.setState({ stepIndex: this.getNextExerciseIndex() });
    }

    getNextExerciseIndex = () => {
        let incomplete = this.props.workout.routine.exercises
                            .filter(e => e.endTime === undefined)
                            .sort((a, b) => a.sequence === b.sequence ? 0 : a.sequence > b.sequence ? 1 : -1);
        
        if (!incomplete || incomplete.length === 0) return -1;

        let started = incomplete.find(e => e.startTime !== undefined);
        if (started) return started.sequence;

        return incomplete[0].sequence;
    }

    render() {
        return (
            <Stepper
                activeStep={!this.props.enabled ? -1 : this.state.stepIndex}
                linear={false}
                orientation={'vertical'}
            >
                {this.props.workout.routine.exercises.map((exercise, index) =>
                    <Step key={index}>
                        <StepButton 
                            completed={exercise.endTime !== undefined}
                            onClick={() => this.handleStepClick(index)}
                            onMouseEnter={() => this.handleStepMouseEnter(exercise)}
                            onMouseLeave={() => this.handleStepMouseLeave(exercise)}
                            icon={exercise.endTime !== undefined ? 
                                <ActionCheckCircle/> :
                                exercise.startTime !== undefined ?
                                    <AVPlayCircleFilled/> :
                                    <ImageLens/>
                            }
                        >
                            <div style={{width: '100%'}}>
                                {this.state.hoverId !== exercise.sequence && this.state.stepIndex !== exercise.sequence ? 
                                    <span style={{float: 'left', marginTop: 0}}>{exercise.name}</span> : 
                                    <div><span style={{float: 'left', marginTop: 5}}>{exercise.name}</span>
                                    <div style={{float: 'right'}}>
                                        <NavigationArrowUpward/>
                                        <NavigationArrowDownward/>
                                    </div></div>
                                }
                            </div>
                        </StepButton>
                        <StepContent>
                            <ExerciseForm 
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