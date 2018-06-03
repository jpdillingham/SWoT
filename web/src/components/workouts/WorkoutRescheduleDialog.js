import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchRoutines } from '../routines/RoutinesActions'
import { addWorkout } from '../workouts/WorkoutsActions'
import Spinner from '../shared/Spinner'
import { grey300 } from 'material-ui/styles/colors'

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

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
    selectedDate: new Date(),
    selectedTime: new Date(),
    workout: {
        id: getGuid(),
        routine: { id: undefined },
        scheduledTime: undefined,
        startTime: undefined,
        endTime: undefined,
    },
    validationErrors: {
        routine: '',
    },
    api: {
        isExecuting: false,
        isErrored: false,
    }
})

class WorkoutRescheduleDialog extends Component {
    state = getInitialState();

    getScheduledTime = () => {
        let date = this.state.selectedDate;
        let time = this.state.selectedTime;

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0).getTime();
    }

    handleDateChange = (event, value) => {
        this.setState({ selectedDate: value });
    }

    handleTimeChange = (event, value) => {
        this.setState({ selectedTime: value })
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.open && !nextProps.open) {
            this.setState(getInitialState());
        }
    }

    handleSaveClick = () => {
        this.setState({ api: { ...this.state.api, isExecuting: true }}, () => {
            this.props.onSave({ date: this.state.selectedDate, time: this.state.selectedTime })
            .then(response => { 
                this.props.onClose({ cancelled: false }) }, error => {
                this.setState({ api: { isExecuting: false, isErrored: true }});
            })
        })
    }

    handleCancelClick = () => {
        this.setState(getInitialState(), () => this.props.onClose({ cancelled: true }))
    }

    render() {
        let refreshStyle = this.state.api.isExecuting ? { backgroundColor: grey300 } : {};

        return (
            <Dialog
                bodyStyle={refreshStyle}
                contentStyle={{ ...styles.dialogContent, refreshStyle }}
                titleStyle={refreshStyle}
                actionsContainerStyle={refreshStyle}
                title={'Reschedule Workout'} 
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
            >
                <DatePicker 
                    floatingLabelText="Date"
                    hintText="Date"
                    firstDayOfWeek={0}
                    textFieldStyle={styles.date}
                    onChange={this.handleDateChange}
                    value={this.state.selectedDate}
                    autoOk={true}
                />
                <TimePicker
                    floatingLabelText="Time"
                    hintText="Time"
                    textFieldStyle={styles.time}
                    onChange={this.handleTimeChange}
                    value={this.state.selectedTime}
                    minutesStep={5}
                    autoOk={true}
                />
                {this.state.api.isExecuting? <Spinner /> : ''}
            </Dialog>
        )
    }
}

export default WorkoutRescheduleDialog