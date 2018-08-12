import React, { Component } from 'react';

import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import AVPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import ImageLens from 'material-ui/svg-icons/image/lens';

import ExerciseForm from '../../exercises/ExerciseForm';
import WorkoutStepTitle from './WorkoutStepTitle';

const initialState = {
    stepIndex: -1,
    hoverId: undefined,
};

class WorkoutStepper extends Component {
    state = initialState;

    handleStepClick = (index) => {
        this.setState({ stepIndex: index });
    }

    handleStepMouseEnter = (exercise) => {
        this.setState({ hoverId: exercise.sequence });
    }

    handleStepMouseLeave = (exercise) => {
        this.setState({ hoverId: undefined });
    }

    handleMoveUpDownClick = (exercise, direction) => {
        let exercises = this.getSequencedExercises();
        let foundIndex = exercises.findIndex(e => e === exercise);
        exercises = JSON.parse(JSON.stringify(exercises));

        if (direction === 'up' && foundIndex > 0) {
            let ex = exercises[foundIndex];
            let prevEx = exercises[foundIndex - 1];

            if (prevEx.originalSequence === undefined) {
                prevEx.originalSequence = prevEx.sequence;
            }

            prevEx.sequence += 1;

            if (ex.originalSequence === undefined) {
                ex.originalSequence = ex.sequence;
            }

            ex.sequence -= 1;

            this.updateWorkout({ ...this.props.workout, routine: { ...this.props.workout.routine, exercises: exercises }});
        }
        else if (direction === 'down' && foundIndex !== -1 && foundIndex < exercises.length - 1) {
            let ex = exercises[foundIndex];
            let nextEx = exercises[foundIndex + 1];

            if (nextEx.originalSequence === undefined) {
                nextEx.originalSequence = nextEx.sequence;
            }

            nextEx.sequence -= 1;

            if (ex.originalSequence === undefined) {
                ex.originalSequence = ex.sequence;
            }

            ex.sequence += 1;

            this.updateWorkout({ ...this.props.workout, routine: { ...this.props.workout.routine, exercises: exercises }});
        }
    }

    componentDidMount = () => {
        this.setState({ stepIndex: this.getNextExerciseIndex() });
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ stepIndex: this.getNextExerciseIndex() });
    }

    updateWorkout = (workout) => {
        this.setState({ 
            stepIndex: -1,
            hoverIndex: undefined,
        }, () => {
            this.props.onWorkoutChange(workout);
        });
    }

    getSequencedExercises = () => {
        return this.props.workout.routine.exercises
                .sort((a, b) => a.sequence === b.sequence ? 0 : a.sequence > b.sequence ? 1 : -1);
    }

    getNextExerciseIndex = () => {
        let incomplete = this.getSequencedExercises()
                            .filter(e => e.endTime === undefined);
        
        if (!incomplete || incomplete.length === 0) return -1;

        let started = incomplete.find(e => e.startTime !== undefined);
        if (started) return started.sequence;

        return incomplete[0].sequence;
    }

    render() {
        let exercises = this.getSequencedExercises();
        let lastExercise = exercises[exercises.length - 1];

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
                            <WorkoutStepTitle
                                exercise={exercise}
                                workoutIsStarted={this.props.workout.startTime !== undefined}
                                isActive={this.state.stepIndex === exercise.sequence}
                                isHovered={this.state.hoverId === exercise.sequence}
                                isFirstExercise={exercise.sequence === 0}
                                isLastExercise={exercise.sequence === lastExercise.sequence}
                                onMoveUpDownClick={this.handleMoveUpDownClick}
                                enabled={this.props.enabled}
                            />
                        </StepButton>
                        <StepContent>
                            <ExerciseForm 
                                exercise={exercise}
                                onChange={this.props.onExerciseChange}
                            />
                        </StepContent>
                    </Step>
                )}
            </Stepper>
        );
    }
}

export default WorkoutStepper;