import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';

import { showSnackbar } from '../app/AppActions.js'

import { EXERCISE_TYPES, EXERCISE_URL_BASE, INTENTS } from '../../constants';
import { getGuid } from '../../util';
import SaveRetryFlatButton from '../shared/SaveRetryFlatButton'


const styles = {
    name: {
        width: '100%'
    },
    type: {
        width: '100%'
    },
    url: {
        width: '100%'
    },
    dialogContent: {
        width: 400,
    },
    addMetric: {
        float: 'left'
    }
}

const initialState = {
    exercise: {
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
            nameList = nameList.filter(n => n.toLowerCase() !== this.props.exercise.name.toLowerCase())
        }

        if (nameList.find(n => n.toLowerCase() === value.toLowerCase())) {
            this.setState(prevState => ({
                validationErrors: { ...prevState.validationErrors, name: 'This name is already in use.' } 
            }))
        }
        else {
            this.setState(prevState => ({
                exercise: { ...prevState.exercise, name: value },
                validationErrors: {  ...prevState.validationErrors, name: '' }
            }))
        }
    }

    handleSaveClick = () => {
        this.setState({
            validationErrors: { 
                name: this.state.exercise.name === '' ? 'The Routine must have a name.' : '',
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
        }
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
                    { /* todo: add dialog content */ }
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDialog)