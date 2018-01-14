import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { addExercise, cancelAddExercise } from './ExercisesActions'

import { EXERCISE_TYPES, EXERCISE_URL_BASE } from '../../constants';
import { getGuid } from '../../util';

import ExerciseMetricDialog from './ExerciseMetricDialog';

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
    }
}

class ExerciseDialog extends Component {
    state = initialState

    handleNameChange = (event, value) => {
        let nameList = this.props.existingNames;

        if (this.props.intent === 'edit') {
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

    handleEditMetricMenuClick = (metric) => {
        this.setState({ 
            metricDialog: { 
                open: true, 
                intent: 'edit', 
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
                intent: 'add', 
                metric: {}
            } 
        })
    }

    handleSaveClick = (result) => {
        this.setState({
            validationErrors: { 
                name: this.state.exercise.name === '' ? 'The Exercise must have a name.' : '',
                type: this.state.exercise.type === '' ? 'A type must be selected.' : '',
                url: this.state.exercise.url === '' ? 'A url must be provided.' : ''
            }
        }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== '') === undefined) {
                result = { exercise: this.state.exercise }
    
                if (this.props.intent === 'edit') {
                    result.edited = true
                }
                else {
                    result.added = true
                }
    
                this.props.addExercise(this.state.exercise)
                    .then(() => {
                        this.props.handleClose(result);
                    }, (err) => {
                        console.log(err);
                    })
            }
        })
    }

    handleCancelClick = () => {
        this.props.cancelAddExercise();
        this.props.handleClose({ cancelled: true })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.intent === 'add') {
            this.setState(initialState);
        }
        else if (nextProps.intent === 'edit') {
            this.setState({ exercise: nextProps.exercise })
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
                    title={(this.props.intent === 'add' ? 'Add' : 'Edit') + ' Exercise'} 
                    actions={
                        <div>
                            <FlatButton label="Add Metric" onClick={this.handleAddMetricClick} style={styles.addMetric} />
                            <FlatButton label="Cancel" onClick={this.handleCancelClick} />
                            <FlatButton 
                                label={this.props.api.post.isErrored ? 'Retry' : 'Save' }
                                onClick={this.handleSaveClick} 
                                disabled={
                                    Object.keys(this.state.validationErrors)
                                        .find(e => this.state.validationErrors[e] !== '') !== undefined
                                }
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
                    <List>
                        <Subheader>Metrics</Subheader>
                        {this.state.exercise.metrics ? this.state.exercise.metrics.map(m =>                     
                                <ListItem
                                    key={m.name}
                                    leftIcon={<ActionAssignment/>}
                                    rightIconButton={
                                        <IconMenu iconButtonElement={
                                            <IconButton touch={true} tooltipPosition="bottom-left">
                                                <MoreVertIcon color={grey400} />
                                            </IconButton>
                                        }>
                                          <MenuItem onClick={() => this.handleEditMetricMenuClick(m)}>Edit</MenuItem>
                                          <MenuItem onClick={() => this.handleDeleteMetricMenuClick(m)}>Delete</MenuItem>
                                        </IconMenu>
                                    }
                                    primaryText={m.name}
                                    secondaryText={m.uom ? m.uom : ''}
                                />
                            ) : ''}
                    </List>
                    { this.props.api.post.isExecuting ? <div style={{ color: '#00FF00', alignContent: 'center'}}>
                        <ActionHighlightOff style={{ color: '#00FF00', height: 24, width: 24}}/>
                        <span style={{ marginLeft: 10, marginTop: -100 }}>Saving Exercise...</span></div> : '' }

                    { this.props.api.post.isErrored ? <div style={{ color: '#ff0000', alignContent: 'center'}}>
                        <ActionHighlightOff style={{ color: '#ff0000', height: 24, width: 24}}/>
                        <span style={{ marginLeft: 10, marginTop: -100 }}>Error saving Exercise.</span>
                    </div> : '' }
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
    existingNames: state.exercises.items.map(e => e.name),
    api: state.exercises.api
})

const mapDispatchToProps = {
    addExercise,
    cancelAddExercise
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDialog)