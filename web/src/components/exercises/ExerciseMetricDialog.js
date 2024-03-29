import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { INTENTS } from '../../constants';

const styles = {
    name: {
        width: '100%',
    },
    uom: {
        width: '100%',
    },
    dialog: {
        width: 400,
    },
};

const initialState = {
    metric: {
        name: '',
        uom: '',
    },
    validationErrors: {
        name: '',
    },
};

class ExerciseMetricDialog extends Component {
    state = initialState;

    handleNameChange = (event, value) => {
        let nameList = this.props.existingNames;

        if (this.props.intent === INTENTS.EDIT) {
            nameList = nameList.filter(n => n.toLowerCase() !== this.props.metric.name.toLowerCase());
        }

        if (nameList.find(n => n.toLowerCase() === value.toLowerCase())) {
            this.setState({
                validationErrors: { name: 'This name is already in use.' },
            });
        }
        else {
            this.setState(prevState => ({
                metric: { ...prevState.metric, name: value },
                validationErrors: { name: '' },
            }));
        }
    };

    handleUomChange = (event, value) => {
        this.setState(prevState => ({
            metric: { ...prevState.metric, uom: value },
        }));
    };

    handleSaveClick = (result) => {
        if (this.state.metric.name === '') {
            this.setState({
                validationErrors: { name: 'The Metric must have a name.' },
            });
        }
        else {
            result = { metric: this.state.metric };

            if (this.props.intent === INTENTS.EDIT) {
                result.edited = true;
            }
            else {
                result.added = true;
            }

            this.props.handleClose(result);
        }
    };

    handleCancelClick = () => {
        this.props.handleClose({ cancelled: true });
    };

    componentWillReceiveProps(nextProps) {
        this.setState(initialState);

        if (nextProps.intent === INTENTS.EDIT) {
            this.setState({ metric: nextProps.metric });
        }
    }

    render() {
        return (
            <Dialog
                title={(this.props.intent === INTENTS.ADD ? 'Add' : 'Edit') + ' Metric'} 
                actions={
                    <div>
                        <FlatButton
                            label="Cancel"
                            onClick={this.handleCancelClick}
                        />
                        <FlatButton
                            label="Save"
                            disabled={this.state.validationErrors.name !== ''}
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
                    disabled={this.props.intent === INTENTS.EDIT}
                    onChange={this.handleNameChange}
                />
                <TextField
                    hintText="e.g. 'Lbs'"
                    floatingLabelText="(Optional) Unit of Measure"
                    defaultValue={this.state.metric.uom}
                    style={styles.uom}
                    onChange={this.handleUomChange}
                />
            </Dialog>
        );
    }
}

export default ExerciseMetricDialog;
