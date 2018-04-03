import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoutines } from '../routines/RoutinesActions'

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import DatePicker from 'material-ui/DatePicker'

import { showSnackbar } from '../app/AppActions.js'

import { getGuid } from '../../util';

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
    routine: {
        width: '100%',
    },
    date: {
        width: '100%',
    }
}

const getInitialState = () => ({
    workout: {
        id: getGuid(),
        routineId: undefined,
        date: new Date(),
    },
    validationErrors: {
        routineId: '',
    },
    api: {
        isExecuting: false,
        isErrored: false,
    }
})

class WorkoutDialog extends Component {
    state = getInitialState();

    handleCancelClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }});
        this.props.handleClose();
    }

    handleSaveClick = () => {
        this.setState({
            validationErrors: {
                routineId: this.state.workout.routineId === undefined ? 'A Routine must be selected.' : ''
            }
        }, () => {
            console.log(this.state.workout);
        })
    }

    handleRoutineChange = (event, index, value) => {
        this.setState({ workout: { ...this.state.workout, routineId: value } });
    }

    handleDateChange = (event, value) => {
        this.setState({ workout: { ...this.state.workout, date: value }});
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.open && !nextProps.open) {
            this.setState(getInitialState());
        }
        else if (!this.props.open && nextProps.open) {
            this.props.fetchRoutines();
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    title={'Add Workout'} 
                    autoScrollBodyContent={true}
                    actions={
                        <div>
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
                    <DatePicker 
                        floatingLabelText="Date"
                        hintText="Date"
                        textFieldStyle={styles.date}
                        onChange={this.handleDateChange}
                        value={this.state.workout.date}
                        autoOk={true}
                    />
                    <SelectField
                        floatingLabelText="Routine"
                        value={this.state.workout.routineId}
                        onChange={this.handleRoutineChange}
                        errorText={this.state.validationErrors.routineId}
                        style={styles.routine}
                    >
                        {this.props.routines.map(r => 
                            <MenuItem 
                                key={r.id} 
                                value={r.id} 
                                primaryText={r.name}
                                leftIcon={<ActionAssignment />}
                            />
                        )}
                    </SelectField>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    routines: state.routines
})

const mapDispatchToProps = {
    showSnackbar,
    fetchRoutines
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDialog)