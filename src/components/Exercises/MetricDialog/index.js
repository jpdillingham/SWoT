import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styles = {
    name: {
        width: '100%',
    },
    uom: {
        width: '100%',
    },
    dialog: {
        width: 400,
    }
}

const initialState = {
    metric: {
        name: '',
        uom: '',
    },
    validationErrors: {
        name: ''
    }
}

class MetricDialog extends Component {
    state = initialState;

    handleNameChange = (event, value) => {
        let nameList = this.props.existingNames;

        if (this.props.intent === 'edit') {
            nameList = this.props.existingNames.filter(n => n != this.props.metric.name)
        }

        if (nameList.find(n => n == value)) {
            this.setState(prevState => ({
                validationErrors: { ...prevState, name: 'This name is already in use.' }
            }))
        }
        else {
            this.setState(prevState => ({
                metric: { ...prevState.metric, name: value },
                validationErrors: { ...prevState, name: '' }
            }))
        }
    }

    handleUomChange = (event, value) => {
        this.setState(prevState => ({
            metric: { ...prevState.metric, uom: value }
        }))
    }

    handleSaveClick = (result) => {
        result = { metric: this.state.metric }

        if (this.props.intent === 'edit') {
            result.edited = true
        }
        else {
            result.added = true
        }

        this.props.handleClose(result);
    }

    handleCancelClick = () => {
        this.props.handleClose({ cancelled: true })
    }

    componentWillReceiveProps(nextProps) {
        this.setState(initialState);

        if (nextProps.intent === 'edit') {
            this.setState({ metric: nextProps.metric })
        }
    }

    render() {
        return (
            <Dialog
                title={(this.props.intent === 'add' ? 'Add' : 'Edit') + ' Metric'} 
                actions={
                    <div>
                        <FlatButton
                            label="Cancel"
                            onClick={this.handleCancelClick}
                        />
                        <FlatButton
                            label="Save"
                            onClick={this.handleSaveClick}
                        />
                    </div>
                }
                modal={true}
                open={this.props.open}
                contentStyle={styles.dialog}
            >
                <TextField
                    hintText="e.g. 'Weight'"
                    floatingLabelText="Name"
                    defaultValue={this.state.metric.name}
                    errorText={this.state.validationErrors.name}
                    style={styles.name}
                    disabled={this.props.intent === 'edit'}
                    onChange={this.handleNameChange}
                />
                <TextField
                    hintText="e.g. 'Lbs'"
                    floatingLabelText="Unit of Measure"
                    defaultValue={this.state.metric.uom}
                    style={styles.uom}
                    onChange={this.handleUomChange}
                />
            </Dialog>
        )
    }
}

export default MetricDialog
