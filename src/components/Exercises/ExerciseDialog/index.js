import React, { Component } from 'react';

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

import { EXERCISE_TYPES, EXERCISE_URL_BASE } from '../../../constants';
import { getGuid } from '../../../util';

import MetricDialog from '../MetricDialog';

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
    dialog: {
        width: 400
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
    }
}

class ExerciseDialog extends Component {
    state = initialState

    handleTypeChange = (event, index, value) => {
        this.setState(prevState => ({ 
            exercise: { ...prevState.exercise, type: value } 
        }))
    }

    handleNameChange = (event, value) => {
        this.setState(prevState => ({
            exercise: { ...prevState.exercise, name: value }
        }))
    }

    handleUrlChange = (event, value) => {
        this.setState(prevState => ({
            exercise: { ...prevState.exercise, url: EXERCISE_URL_BASE + value }
        }))
    }

    handleMetricDialogOpen = (intent, metric) => {
        this.setState({ 
            metricDialog: { 
                open: true, 
                intent: intent, 
                metric: metric 
            } 
        })
    }

    handleMetricDialogClose = (result) => {
        if (result.added) {
            this.metricAdd(result.metric)
        }
        else if (result.edited) {
            this.metricUpdate(result.metric)
        }

        this.setState({ metricDialog: { open: false, intent: '' } })
    }

    handleMetricDelete = (metric) => {
        this.metricDelete(metric);
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
                metrics: prevState.exercise.metrics.map(m => { return m.name == metric.name ? metric : m })
            }
        }))
    }

    metricDelete = (metric) => {
        this.setState(prevState => ({
            exercise: {
                ...prevState.exercise,
                metrics: prevState.exercise.metrics.filter(m => m.name != metric.name)
            }
        }))
    }

    componentWillReceiveProps(nextProps) {
        this.setState(initialState);
    }

    render() {
        const rightIconMenu = (
            <IconMenu iconButtonElement={
                <IconButton touch={true} tooltipPosition="bottom-left">
                    <MoreVertIcon color={grey400} />
                </IconButton>
            }>
              <MenuItem onClick={this.handleMetricDialogOpen}>Edit</MenuItem>
              <MenuItem onClick={this.handleMetricDelete}>Delete</MenuItem>
            </IconMenu>
        );

        return (
            <div>
                <Dialog
                    title="Add Exercise"
                    actions={
                        <div>
                            <FlatButton 
                                style={styles.addMetric}
                                label="Add Metric"
                                onClick={() => this.handleMetricDialogOpen('add')}
                            />
                            <FlatButton
                                label="Cancel"
                                onClick={() => this.props.handleClose({ cancelled: true })}
                            />
                            <FlatButton
                                label="Add"
                                onClick={() => this.props.handleClose({ added: true, exercise: this.state.exercise })}
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                    contentStyle={styles.dialog}
                >
                    <TextField
                        hintText="e.g. 'Bench Press'"
                        floatingLabelText="Name"
                        style={styles.name}
                        onChange={this.handleNameChange}
                    /><br />
                    <SelectField
                        floatingLabelText="Type"
                        value={this.state.exercise.type}
                        onChange={this.handleTypeChange}
                        style={styles.type}
                    >
                        {EXERCISE_TYPES.map(e => <MenuItem key={e} value={e} primaryText={e}/>)}
                    </SelectField><br/>
                    <TextField
                        hintText="e.g. '/barbell-bench-press-medium-grip'"
                        floatingLabelText="Bodybuilding.com Url"
                        style={styles.url}
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
                                          <MenuItem onClick={() => this.handleMetricDialogOpen('edit', m)}>Edit</MenuItem>
                                          <MenuItem onClick={() => this.handleMetricDelete(m)}>Delete</MenuItem>
                                        </IconMenu>
                                    }
                                    primaryText={m.name}
                                    secondaryText={m.uom ? m.uom : ''}
                                />
                            ) : ''}
                    </List>
                </Dialog>
                <MetricDialog
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

export default ExerciseDialog

