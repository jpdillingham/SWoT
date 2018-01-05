import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

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
    }
}

class MetricAddDialog extends Component {
    state = initialState;

    handleNameChange = (event, value) => {
        this.setState(prevState => ({
            metric: { ...prevState.metric, name: value }
        }))
    }

    handleUomChange = (event, value) => {
        this.setState(prevState => ({
            metric: { ...prevState.metric, uom: value }
        }))
    }

    componentWillReceiveProps(nextProps) {
        this.setState(initialState);
    }

    render() {
        return (
            <Dialog
                title="Add Metric"
                actions={
                    <div>
                        <FlatButton
                            label="Cancel"
                            onClick={() => this.props.handleClose({ cancelled: true })}
                        />
                        <FlatButton
                            label="Add"
                            onClick={() => this.props.handleClose({ added: true, metric: this.state.metric })}
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
                    style={styles.name}
                    onChange={this.handleNameChange}
                />
                <TextField
                    hintText="e.g. 'Lbs'"
                    floatingLabelText="Unit of Measure"
                    style={styles.uom}
                    onChange={this.handleUomChange}
                />
            </Dialog>
        )
    }
}

export default MetricAddDialog
