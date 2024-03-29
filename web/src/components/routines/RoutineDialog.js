import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RoutineExerciseList from './RoutineExerciseList';
import SaveRetryFlatButton from '../shared/SaveRetryFlatButton';
import TextField from 'material-ui/TextField';
import { grey300 } from 'material-ui/styles/colors';

import Spinner from '../shared/Spinner';

import RoutineExerciseDialog from './RoutineExerciseDialog';

import { INTENTS } from '../../constants';
import { getGuid, swapArrayElements } from '../../util';

import { fetchExercises } from '../exercises/ExercisesActions';
import { updateRoutine, addRoutine } from '../routines/RoutinesActions';
import { showSnackbar } from '../app/AppActions';
import ColorSelectField from '../shared/ColorSelectField';

const styles = {
    name: {
        width: '100%',
    },
    color: {
        width: '100%',
    },
    dialogContent: {
        width: 400,
    },
    addExercise: {
        float: 'left',
    },
};

const initialState = {
    routine: {
        id: getGuid(),
        name: '',
        exercises: [],
        color: undefined,
    },
    exerciseDialog: {
        open: false,
    },
    validationErrors: {
        name: '',
        color: '',
    },
    api: {
        isExecuting: false,
        isErrored: false,
    },
};

class RoutineDialog extends Component {
    state = initialState;

    handleNameChange = (event, value) => {
        let nameList = this.props.existingNames;

        if (this.props.intent === INTENTS.EDIT) {
            nameList = nameList.filter(n => n.toLowerCase() !== this.props.routine.name.toLowerCase());
        }

        if (nameList.find(n => n.toLowerCase() === value.toLowerCase())) {
            this.setState(prevState => ({
                validationErrors: { ...prevState.validationErrors, name: 'This name is already in use.' }, 
            }));
        }
        else {
            this.setState(prevState => ({
                routine: { ...prevState.routine, name: value },
                validationErrors: {  ...prevState.validationErrors, name: '' },
            }));
        }
    };

    handleColorChange = (event, index, value) => {
        this.setState(prevState => ({
            routine: { ...prevState.routine, color: value },
            validationErrors: { ...prevState.validationErrors, color: '' },
        }));
    };

    handleAddExerciseClick = () => {
        this.props.fetchExercises().then(
            this.setState({ exerciseDialog: { open: true }})
        );
    };

    handleSaveClick = () => {
        this.setState({
            validationErrors: { 
                name: this.state.routine.name === '' ? 'The Routine must have a name.' : '',
                color: this.state.routine.color === undefined ? 'The Routine must be assigned a color.' : '',
            },
        }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== '') === undefined) {
                let routine = { ...this.state.routine };
                routine.exercises.map((e, index) => e.sequence = index); 

                this.setState({ api: { ...this.state.api, isExecuting: true } });

                if (this.props.intent === INTENTS.EDIT) {
                    this.props.updateRoutine(routine)
                    .then((response) => {
                        this.handleApiSuccess('Updated Routine \'' + response.data.name + '\'.');
                    }, (error) => {
                        this.handleApiError('Error updating Routine \'' + routine.name + ': ' + error);
                    });
                }
                else {
                    this.props.addRoutine(routine)
                    .then((response) => {
                        this.handleApiSuccess('Added Routine \'' + response.data.name + '\'.');
                    }, (error) => {
                        this.handleApiError('Error adding Routine \'' + routine.name + ': ' + error);
                    });
                }
            }
        });
    };

    handleApiSuccess = (message) => {
        this.setState({ ...this.state.api, isExecuting: false });
        this.props.showSnackbar(message);
        this.props.handleClose();
    };

    handleApiError = (message) => {
        this.setState({ api: { isExecuting: false, isErrored: true }});
        this.props.showSnackbar(message);
    };

    handleCancelClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }});
        this.props.handleClose();
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.open && !nextProps.open) {
            this.setState({ ...initialState, routine: { ...initialState.routine, id: getGuid() }});
        }
  
        if (!this.props.open && nextProps.open) {
            if (nextProps.intent === INTENTS.EDIT) {
                this.setState({ routine: nextProps.routine });
            }
            else if (nextProps.intent === INTENTS.COPY) {
                this.setState({ routine: { ...nextProps.routine, id: getGuid() }});
            }
        }
    }

    handleMoveUpExerciseMenuClick = (index) => {
        let arr = this.state.routine.exercises.slice();

        if (index > 0) {
            arr = swapArrayElements(arr, index, index - 1);     
        }

        this.setState({ routine: { ...this.state.routine, exercises: arr } }); 
    };

    handleMoveDownExerciseMenuClick = (index) => {
        let arr = this.state.routine.exercises.slice();

        if (index < arr.length - 1) {
            arr = swapArrayElements(arr, index, index + 1);
        }

        this.setState({ routine: { ...this.state.routine, exercises: arr } });
    };

    handleDeleteExerciseMenuClick = (index) => {
        let arr = this.state.routine.exercises.slice();
        arr.splice(index, 1);

        this.setState({ routine: { ...this.state.routine, exercises: arr }});
    };

    handleExerciseDialogClose = (result) => {
        if (result.added) {
            this.setState({ routine: { ...this.state.routine, exercises: this.state.routine.exercises.concat(result.exercise) }});
        }
        this.setState({ exerciseDialog: { open: false }});
    };

    render() {
        let refreshStyle = this.state.api.isExecuting ? { backgroundColor: grey300 } : {};

        return (
            <div>
                <Dialog
                    bodyStyle={refreshStyle}
                    actionsContainerStyle={refreshStyle}
                    titleStyle={refreshStyle}
                    contentStyle={{ ...styles.dialogContent, refreshStyle }}
                    title={(this.props.intent === INTENTS.ADD ? 'Add' : this.props.intent === INTENTS.EDIT ? 'Edit' : 'Duplicate') + ' Routine'} 
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <FlatButton 
                                label="Add Exercise" 
                                onClick={this.handleAddExerciseClick} 
                                style={styles.addExercise} 
                                disabled={this.state.api.isExecuting}
                            />
                            <FlatButton 
                                label="Cancel" 
                                onClick={this.handleCancelClick} 
                                disabled={this.state.api.isExecuting}
                            />
                            <SaveRetryFlatButton 
                                onClick={this.handleSaveClick} 
                                api={this.state.api} 
                                validation={this.state.validationErrors} 
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                    <TextField
                        hintText="e.g. 'Legs'"
                        floatingLabelText="Name"
                        defaultValue={this.state.routine.name}
                        errorText={this.state.validationErrors.name}
                        style={styles.name}
                        onChange={this.handleNameChange}
                    /><br />
                    <ColorSelectField
                        hintText="Color"
                        floatingLabelText="Color"
                        onChange={this.handleColorChange}
                        value={this.state.routine.color}
                        errorText={this.state.validationErrors.color}
                        style={styles.color}
                    />
                    <br />
                    <RoutineExerciseList 
                        exercises={this.state.routine.exercises} 
                        onMoveUpClick={this.handleMoveUpExerciseMenuClick}
                        onMoveDownClick={this.handleMoveDownExerciseMenuClick}
                        onDeleteClick={this.handleDeleteExerciseMenuClick}
                    />
                    {this.state.api.isExecuting ? <Spinner/> : ''}
                </Dialog>
                <RoutineExerciseDialog
                    open={this.state.exerciseDialog.open} 
                    exercises={this.props.exercises}
                    handleClose={this.handleExerciseDialogClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    existingNames: state.routines.map(e => e.name),
    exercises: state.exercises,
});

const mapDispatchToProps = {
    fetchExercises,
    updateRoutine,
    addRoutine,
    showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDialog);