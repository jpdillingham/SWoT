import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { addExercise, updateExercise } from './ExercisesActions'
import { showSnackbar } from '../app/AppActions.js'

import { EXERCISE_TYPES, EXERCISE_URL_BASE, INTENTS } from '../../constants';
import { getGuid, swap } from '../../util';

import ExerciseMetricDialog from './ExerciseMetricDialog';
import ExerciseMetricList from './ExerciseMetricList';
import SaveRetryFlatButton from '../shared/SaveRetryFlatButton';

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
    },
}

const initialState = {
    exercise: {
        id: getGuid(),
        name: '',
        type: '',
        url: '',
        metrics: []
    },
    metricDialog: {
        open: false,
        intent: '',
        metric: {}
    },
    validationErrors: {
        name: '',
        type: '',
        url: '',
    },
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

class ExerciseDialog extends Component {
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

    handleTypeChange = (event, index, value) => {
        this.setState(prevState => ({ 
            exercise: { ...prevState.exercise, type: value },
            validationErrors: { ...prevState.validationErrors, type: '' }
        }))
    }

    handleUrlChange = (event, value) => {
        this.setState(prevState => ({
            exercise: { ...prevState.exercise, url: EXERCISE_URL_BASE + value },
            validationErrors: { ...prevState.validationErrors, url: '' }
        }))
    }

    handleMetricDialogClose = (result) => {
        if (result.added) {
            this.metricAdd(result.metric)
        }
        else if (result.edited) {
            this.metricUpdate(result.metric)
        }

        this.setState({ metricDialog: { open: false, intent: '', metric: {} } })
    }

    handleMoveUpMetricMenuClick = (index) => {
        let arr = this.state.exercise.metrics.slice();

        if (index > 0) {
            arr = swap(arr, index, index - 1);     
        }

        this.setState({ exercise: { ...this.state.exercise, metrics: arr } }) 
    }

    handleMoveDownMetricMenuClick = (index) => {
        let arr = this.state.exercise.metrics.slice();

        if (index < arr.length - 1) {
            arr = swap(arr, index, index + 1);
        }

        this.setState({ exercise: { ...this.state.exercise, metrics: arr } })
    }

    handleEditMetricMenuClick = (metric) => {
        this.setState({ 
            metricDialog: { 
                open: true, 
                intent: INTENTS.EDIT, 
                metric: metric 
            } 
        })
    }

    handleDeleteMetricMenuClick = (metric) => {
        this.metricDelete(metric);
    }

    handleAddMetricClick = () => {
        this.setState({ 
            metricDialog: { 
                open: true, 
                intent: INTENTS.ADD, 
                metric: {}
            } 
        })
    }

    handleSaveClick = () => {
        this.setState({
            validationErrors: { 
                name: this.state.exercise.name === '' ? 'The Exercise must have a name.' : '',
                type: this.state.exercise.type === '' ? 'A type must be selected.' : '',
                url: this.state.exercise.url === '' ? 'A url must be provided.' : ''
            }
        }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== '') === undefined) {
                this.setState({ api: { ...this.state.api, isExecuting: true } })

                if (this.props.intent === INTENTS.EDIT) {
                    this.props.updateExercise(this.state.exercise)
                    .then((response) => {
                        this.handleApiSuccess('Updated Exercise \'' + response.data.name + '\'.')
                    }, (error) => {
                        this.handleApiError(error);
                    })
                }
                else {
                    this.props.addExercise(this.state.exercise)
                    .then((response) => {
                        this.handleApiSuccess('Added Exercise \'' + response.data.name + '\'.')
                    }, (error) => {
                        this.handleApiError(error);
                    })
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
        let message = 'Error saving Exercise: '

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
            this.setState({ ...initialState, exercise: { ...initialState.exercise, id: getGuid() }})
        }
  
        if (!this.props.open && nextProps.open) {
            if (nextProps.intent === INTENTS.EDIT) {
                this.setState({ exercise: nextProps.exercise })
            }
            else if (nextProps.intent === INTENTS.COPY) {
                this.setState({ exercise: { ...nextProps.exercise, id: getGuid() }})
            }
        }
    }

    metricAdd = (metric) => {
        this.setState(prevState => ({
            exercise: {
                ...prevState.exercise,
                metrics: prevState.exercise.metrics.concat(metric)
            }
        }))
    }

    metricUpdate = (metric) => {
        this.setState(prevState => ({
            exercise: {
                ...prevState.exercise,
                metrics: prevState.exercise.metrics.map(m => { 
                    return m.name === metric.name ? metric : m 
                })
            }
        }))
    }

    metricDelete = (metric) => {
        this.setState(prevState => ({
            exercise: {
                ...prevState.exercise,
                metrics: prevState.exercise.metrics.filter(m => m.name !== metric.name)
            }
        }))
    }

    render() {
        return (
            <div>
                <Dialog
                    title={(this.props.intent === INTENTS.ADD ? 'Add' : 'Edit') + ' Exercise'} 
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <FlatButton label="Add Metric" onClick={this.handleAddMetricClick} style={styles.addMetric} />
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
                        hintText="e.g. 'Bench Press'"
                        floatingLabelText="Name"
                        defaultValue={this.state.exercise.name}
                        errorText={this.state.validationErrors.name}
                        style={styles.name}
                        onChange={this.handleNameChange}
                    /><br />
                    <SelectField
                        floatingLabelText="Type"
                        value={this.state.exercise.type}
                        onChange={this.handleTypeChange}
                        errorText={this.state.validationErrors.type}
                        style={styles.type}
                    >
                        {EXERCISE_TYPES.map(e => <MenuItem key={e} value={e} primaryText={e}/>)}
                    </SelectField><br/>
                    <TextField
                        hintText="e.g. '/barbell-bench-press-medium-grip'"
                        floatingLabelText="Bodybuilding.com Url"
                        defaultValue={this.state.exercise.url}
                        style={styles.url}
                        errorText={this.state.validationErrors.url}
                        onChange={this.handleUrlChange}
                    /><br />
                    <ExerciseMetricList 
                        metrics={this.state.exercise.metrics} 
                        onMoveUpClick={this.handleMoveUpMetricMenuClick}
                        onMoveDownClick={this.handleMoveDownMetricMenuClick}
                        onEditClick={this.handleEditMetricMenuClick}
                        onDeleteClick={this.handleDeleteMetricMenuClick}
                    />
                </Dialog>
                <ExerciseMetricDialog
                    open={this.state.metricDialog.open} 
                    intent={this.state.metricDialog.intent}
                    metric={this.state.metricDialog.metric}
                    existingNames={this.state.exercise.metrics.map(m => m.name)}
                    handleClose={this.handleMetricDialogClose}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    existingNames: state.exercises.map(e => e.name)
})

const mapDispatchToProps = {
    addExercise,
    updateExercise,
    showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDialog)