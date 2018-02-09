import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RoutineExerciseList from './RoutineExerciseList';
import SaveRetryFlatButton from '../shared/SaveRetryFlatButton'
import TextField from 'material-ui/TextField';

import RoutineExerciseDialog from './RoutineExerciseDialog';

import { INTENTS } from '../../constants';
import { getGuid, swap } from '../../util';

import { fetchExercises } from '../exercises/ExercisesActions'

const styles = {
    name: {
        width: '100%'
    },
    dialogContent: {
        width: 400,
    },
    addExercise: {
        float: 'left'
    },
}

const initialState = {
    routine: {
        id: getGuid(),
        name: '',
        exercises: []
    },
    exerciseDialog: {
        open: false
    },
    validationErrors: {
        name: '',
    },
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

class RoutineDialog extends Component {
    state = initialState

    handleNameChange = (event, value) => {
        let nameList = this.props.existingNames;

        if (this.props.intent === INTENTS.EDIT) {
            nameList = nameList.filter(n => n.toLowerCase() !== this.props.routine.name.toLowerCase())
        }

        if (nameList.find(n => n.toLowerCase() === value.toLowerCase())) {
            this.setState(prevState => ({
                validationErrors: { ...prevState.validationErrors, name: 'This name is already in use.' } 
            }))
        }
        else {
            this.setState(prevState => ({
                routine: { ...prevState.exercise, name: value },
                validationErrors: {  ...prevState.validationErrors, name: '' }
            }))
        }
    }

    handleAddExerciseClick = () => {
        this.props.fetchExercises().then(
            this.setState({ exerciseDialog: { open: true }})
        )
    }

    handleSaveClick = () => {
        this.setState({
            validationErrors: { 
                name: this.state.routine.name === '' ? 'The Routine must have a name.' : '',
            }
        }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== '') === undefined) {
                this.setState({ api: { ...this.state.api, isExecuting: true } })

                if (this.props.intent === INTENTS.EDIT) {
                    // edit routine
                }
                else {
                    // add routine
                }
            }
        })
    }

    handleApiSuccess = (message) => {
        this.setState({ ...this.state.api, isExecuting: false })
        this.props.showSnackbar(message)
        this.props.handleClose();
    }

    handleApiError = (error) => {
        let message = 'Error saving Routine: '

        if (error.response) {
            message += JSON.stringify(error.response.data).replace(/"/g, "")
        }
        else {
            message += error
        }

        this.setState({ api: { isExecuting: false, isErrored: true }})
        this.props.showSnackbar(message);
    }

    handleCancelClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }})
        this.props.handleClose()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.open && !nextProps.open) {
            this.setState(initialState)
        }
  
        if (!this.props.open && nextProps.open) {
            if (nextProps.intent === INTENTS.EDIT) {
                this.setState({ routine: nextProps.routine })
            }
            else if (nextProps.intent === INTENTS.COPY) {
                this.setState({ routine: { ...nextProps.routine, id: getGuid() }})
            }
        }
    }

    handleMoveUpExerciseMenuClick = (exercise) => {
        let arr = this.state.routine.exercises.slice();
        let index = arr.indexOf(exercise);

        if (index > 0) {
            arr = swap(arr, index, index - 1);     
        }

        this.setState({ routine: { ...this.state.routine, exercises: arr } }) 
    }

    handleMoveDownExerciseMenuClick = (exercise) => {
        let arr = this.state.routine.exercises.slice();
        let index = arr.indexOf(exercise);

        if (index < arr.length - 1) {
            arr = swap(arr, index, index + 1);
        }

        this.setState({ routine: { ...this.state.routine, exercises: arr } })
    }

    handleDeleteExerciseMenuClick = (exercise) => {
        this.setState({ routine: { ...this.state.routine, exercises: this.state.routine.exercises.filter(e => e.id !== exercise.id) }})
    }

    handleExerciseDialogClose = (result) => {
        if (result.added) {
            this.setState({ routine: { ...this.state.routine, exercises: this.state.routine.exercises.concat(result.exercise) }})
        }
        this.setState({ exerciseDialog: { open: false }});
    }

    render() {
        return (
            <div>
                <Dialog
                    title={(this.props.intent === INTENTS.ADD ? 'Add' : 'Edit') + ' Routine'} 
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <FlatButton label="Add Exercise" onClick={this.handleAddExerciseClick} style={styles.addExercise} />
                            <FlatButton label="Cancel" onClick={this.handleCancelClick} />
                            <SaveRetryFlatButton 
                                onClick={this.handleSaveClick} 
                                api={this.state.api} 
                                validation={this.state.validationErrors} 
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                    contentStyle={styles.dialogContent}
                >
                    <TextField
                        hintText="e.g. 'Legs'"
                        floatingLabelText="Name"
                        defaultValue={this.state.routine.name}
                        errorText={this.state.validationErrors.name}
                        style={styles.name}
                        onChange={this.handleNameChange}
                    /><br />
                    <RoutineExerciseList 
                        exercises={this.state.routine.exercises} 
                        onMoveUpClick={this.handleMoveUpExerciseMenuClick}
                        onMoveDownClick={this.handleMoveDownExerciseMenuClick}
                        onDeleteClick={this.handleDeleteExerciseMenuClick}
                    />
                </Dialog>
                <RoutineExerciseDialog
                    open={this.state.exerciseDialog.open} 
                    exercises={this.props.exercises}
                    handleClose={this.handleExerciseDialogClose}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    existingNames: state.routines.map(e => e.name),
    exercises: state.exercises,
})

const mapDispatchToProps = {
    fetchExercises,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDialog)