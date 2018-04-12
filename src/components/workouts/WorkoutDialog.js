import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoutines } from '../routines/RoutinesActions'
import { addWorkout } from '../workouts/WorkoutsActions'

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
        routine: { id: undefined },
        date: new Date(),
        status: 'undone',
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
                this.setState({ api: { ...this.state.api, isExecuting: true } })

                this.props.addWorkout(this.state.workout)
                .then(response => {
                    this.handleApiSuccess('Added Workout \'' + response.data.id + '\'.')
                }, error => {
                    this.handleApiError(error);
                })
            }
        })
    }

    handleApiSuccess = (message) => {
        this.setState({ ...this.state.api, isExecuting: false })
        this.props.showSnackbar(message)
        this.props.handleClose();
    }

    handleApiError = (error) => {
        let message = 'Error saving Workout: '

        if (error.response) {
            message += JSON.stringify(error.response.data).replace(/"/g, "")
        }
        else {
            message += error
        }

        this.setState({ api: { isExecuting: false, isErrored: true }})
        this.props.showSnackbar(message);
    }

    handleRoutineChange = (event, index, value) => {
        this.setState({ 
            workout: { 
                ...this.state.workout, 
                routine: this.props.routines.find(r => r.id === value)
            } 
        });
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
    fetchRoutines,
    addWorkout
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDialog)