import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RoutineExerciseList from './RoutineExerciseList';
import SaveRetryFlatButton from '../shared/SaveRetryFlatButton'
import TextField from 'material-ui/TextField';

import { INTENTS } from '../../constants';
import { getGuid, swap } from '../../util';

const styles = {
    name: {
        width: '100%'
    },
    dialogContent: {
        width: 400,
    },
}

const initialState = {
    routine: {
        id: getGuid(),
        name: '',
        exercises: []
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

    handleEditExerciseMenuClick = (exercise) => {

    }

    handleEditExerciseMenuClick = (exercise) => {

    }

    render() {
        return (
            <div>
                <Dialog
                    title={(this.props.intent === INTENTS.ADD ? 'Add' : 'Edit') + ' Routine'} 
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <FlatButton label="Add Exercise" onClick={this.handleAddMetricClick} style={styles.addMetric} />
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    existingNames: state.routines.map(e => e.name)
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDialog)