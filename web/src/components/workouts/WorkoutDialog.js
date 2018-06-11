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
    dialogContent: {
        width: 400,
    },
    routine: {
        width: '100%',
    },
    date: {
        width: '100%',
    },
    time: {
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

class WorkoutDialog extends Component {
    state = getInitialState();

    handleCancelClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }});
        this.props.handleClose();
    }

    handleSaveClick = () => {
        this.setState({
            validationErrors: {
                routine: this.state.workout.routine.id === undefined ? 'A Routine must be selected.' : ''
            }
        }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== '') === undefined) {
                this.setState({ 
                    api: { ...this.state.api, isExecuting: true },
                    workout: {
                        ...this.state.workout,
                        scheduledTime: this.getScheduledTime(),
                    }
                }, () => 
                    this.props.addWorkout(this.state.workout)
                    .then(response => {
                        this.handleApiSuccess('Scheduled Workout \'' + response.data.routine.name + '\' for ' + moment(response.data.scheduledTime).calendar() + '.')
                    }, error => {
                        this.handleApiError('Error scheduling Workout: ' + error);
                    })
                )
            }
        })
    }

    getScheduledTime = () => {
        let date = this.state.selectedDate;
        let time = this.state.selectedTime;

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0).getTime();
    }

    handleApiSuccess = (message) => {
        this.setState({ ...this.state.api, isExecuting: false })
        this.props.showSnackbar(message)
        this.props.handleClose();
    }

    handleApiError = (message) => {
        this.setState({ api: { isExecuting: false, isErrored: true }})
        this.props.showSnackbar(message);
    }

    handleRoutineChange = (event, index, value) => {
        this.setState({ 
            validationErrors: { routine: '' },
            workout: { 
                ...this.state.workout, 
                routine: this.props.routines.find(r => r.id === value)
            } 
        });
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
        else if (!this.props.open && nextProps.open) {
            this.props.fetchRoutines();
            
            if (nextProps.defaultDate) {
                this.setState({ selectedDate: nextProps.defaultDate });
            }
        }
    }

    render() {
        let refreshStyle = this.state.api.isExecuting ? { backgroundColor: grey300 } : {};

        return (
            <Dialog
                bodyStyle={refreshStyle}
                contentStyle={{ ...styles.dialogContent, refreshStyle }}
                titleStyle={refreshStyle}
                actionsContainerStyle={refreshStyle}
                title={'Schedule Workout'} 
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
                    style={styles.date}
                />
                <TimePicker
                    floatingLabelText="Time"
                    hintText="Time"
                    textFieldStyle={styles.time}
                    onChange={this.handleTimeChange}
                    value={this.state.selectedTime}
                    minutesStep={5}
                    autoOk={true}
                    style={styles.time}
                />
                <SelectField
                    floatingLabelText="Routine"
                    value={this.state.workout.routine.id}
                    onChange={this.handleRoutineChange}
                    errorText={this.state.validationErrors.routine}
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
                {this.state.api.isExecuting? <Spinner /> : ''}
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    routines: state.routines
})

const mapDispatchToProps = {
    showSnackbar,
    fetchRoutines,
    addWorkout
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDialog)