import React, { Component } from 'react';
import moment from 'moment';

import { grey300, red500 } from 'material-ui/styles/colors'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { AvPlayArrow, AvStop, AvReplay, ActionUpdate } from 'material-ui/svg-icons';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField/TextField';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import { fontContrastColor } from '../../util';

import WorkoutStepper from './stepper/WorkoutStepper';
import ConfirmDialog from '../shared/ConfirmDialog';
import Spinner from '../shared/Spinner';
import WorkoutRescheduleDialog from './WorkoutRescheduleDialog';

const styles = {
    cardHeader: {
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    stepper: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    iconMenu: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
    fab: {
        margin: 0,
        top: 47,
        right: 40,
        bottom: 'auto',
        left: 'auto',
        position: 'absolute',
        zIndex: 1000,
    },
    divider: {
        marginTop: 30,
    },
    notes: {
        width: '100%',
    },
    content: {
        position: 'relative',
    },
    spinner: {
        zIndex: 1000,
    },
}

const initialState = {
    deleteDialog: {
        open: false,
    },
    resetDialog: {
        open: false,
    },
    completeDialog: {
        open: false,
    },
    rescheduleDialog: {
        open: false,
    },
    workout: {
        notes: '',
    },
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

class WorkoutCard extends Component {
    state = initialState;

    handleStartCompleteClick = () => {
        let workout = this.props.workout;

        if (workout.startTime === undefined) {
            this.setState({ api: { ...this.state.api, isExecuting: true }}, () => {
                this.props.onStart(workout)
                .then(response => { 
                    this.setState({ api: { isExecuting: false, isErrored: false }});
                }, error => {
                    this.setState({ api: { isExecuting: false, isErrored: true }});
                })
            })
        }
        else if (workout.endTime === undefined) {
            this.setState({ completeDialog: { open: true }});
        }
    }

    handleWorkoutChange = (workout) => {
        this.setState({ api: { ...this.state.api, isExecuting: true }}, () => {
            this.props.onWorkoutChange(workout)
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }});
            }, error => {
                this.setState({ api: { isExecuting: false, isErrored: true }});
            });
        });
    }

    handleCompleteDialogClose = (result) => {
        if (result.cancelled) {
            this.setState({ completeDialog: { open: false }});
        }
    }

    handleNotesChange = (event, value) => {
        this.setState({ workout: { ...this.state.workout, notes: value }})
    }

    handleDeleteClick = () => {
        this.setState({ deleteDialog: { open: true }})
    }

    handleDeleteDialogClose = (result) => {
        if (result.cancelled) {
            this.setState({ deleteDialog: { open: false }})
        }
    }

    handleResetClick = () => {
        this.setState({ resetDialog: { open: true }})
    }

    handleResetDialogClose = (result) => {
        this.setState({ resetDialog: { open: false }})
    }

    handleRescheduleClick = () => {
        this.setState({ rescheduleDialog: { open: true }})
    }

    handleRescheduleDialogClose = (result) => {
        this.setState({ rescheduleDialog: { open: false }})
    }

    render() {
        let color = this.props.workout.routine.color;
        color = !color || color === 0 ? red500 : color;
        let fontColor = fontContrastColor(color);

        return (
            <div>
                <Card zDepth={2} style={!this.state.api.isExecuting ? styles.card : { ...styles.card, backgroundColor: grey300 }}>
                    <CardHeader                        
                        titleStyle={{ ...styles.cardTitle, color: fontColor }}
                        style={{ ...styles.cardHeader, backgroundColor: color }}
                        title={this.props.workout.routine.name}
                        subtitle={
                            this.props.workout.startTime === undefined ? 'Scheduled for ' + moment(this.props.workout.scheduledTime).calendar() :
                            'Started ' + moment(this.props.workout.startTime).calendar()
                        }
                        subtitleStyle={{ color: fontColor }}
                        avatar={
                            <Avatar 
                                backgroundColor={color} 
                                size={40} 
                                color={fontColor}
                                icon={<ActionAssignmentTurnedIn/>} 
                            />
                        }
                    >
                        <FloatingActionButton 
                            secondary={false} 
                            zDepth={2} 
                            style={styles.fab}
                            mini={true}
                            onClick={this.handleStartCompleteClick}
                        >
                            {this.props.workout.startTime === undefined ? <AvPlayArrow/> : <AvStop/> }
                        </FloatingActionButton>
                    </CardHeader>
                    <IconMenu
                        style={styles.iconMenu}
                        iconButtonElement={<IconButton><MoreVertIcon color={fontColor}/></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        {this.props.workout.startTime ? 
                            <MenuItem 
                                primaryText="Reset" 
                                onClick={this.handleResetClick} 
                                leftIcon={<AvReplay/>}
                            /> :
                            <MenuItem 
                                primaryText="Reschedule" 
                                onClick={this.handleRescheduleClick} 
                                leftIcon={<ActionUpdate/>}
                            />                        
                        }
                        <MenuItem primaryText="Delete" onClick={this.handleDeleteClick} leftIcon={<ActionDelete/>}/>
                    </IconMenu>
                    <CardText>
                        <div style={styles.content}>
                            <WorkoutStepper
                                enabled={this.props.workout.startTime !== undefined && !this.state.api.isExecuting}
                                style={styles.stepper}
                                workout={this.props.workout}
                                onExerciseChange={this.props.onExerciseChange}
                                onWorkoutChange={this.handleWorkoutChange}
                            />
                            <Divider style={styles.divider}/>
                            <TextField
                                hintText={'Workout Notes'}
                                floatingLabelText={'Workout Notes'}
                                defaultValue={this.props.workout.notes}
                                style={styles.notes}
                                multiLine={true}
                                onChange={this.handleNotesChange}
                                disabled={this.props.workout.endTime !== undefined  || this.props.workout.startTime === undefined}
                            />
                            {this.state.api.isExecuting ? <Spinner style={styles.spinner}/> : ''}
                        </div>
                    </CardText>
                </Card>
                <ConfirmDialog 
                    title={'Complete Workout'}
                    buttonCaption={'Complete'}
                    onConfirm={() => this.props.onComplete({ ...this.props.workout, notes: this.state.workout.notes })}
                    onClose={this.handleCompleteDialogClose}
                    open={this.state.completeDialog.open} 
                >
                    <p>Are you sure you want to complete Workout '{this.props.workout.routine.name}'?</p>
                    <p>Once completed, the Workout can't be restarted.</p>
                </ConfirmDialog>
                <ConfirmDialog 
                    title={'Delete Workout'}
                    buttonCaption={'Delete'}
                    onConfirm={this.props.onDelete}
                    onClose={this.handleDeleteDialogClose}
                    open={this.state.deleteDialog.open} 
                >
                    Are you sure you want to delete Workout '{this.props.workout.routine.name}'?
                </ConfirmDialog>
                <ConfirmDialog 
                    title={'Reset Workout'}
                    buttonCaption={'Reset'}
                    onConfirm={this.props.onReset}
                    onClose={this.handleResetDialogClose}
                    open={this.state.resetDialog.open} 
                >
                    <p>Are you sure you want to reset Workout '{this.props.workout.routine.name}'?</p>
                    <p>All data will be lost!</p>
                </ConfirmDialog>
                <WorkoutRescheduleDialog
                    workout={this.props.workout}
                    open={this.state.rescheduleDialog.open}
                    onSave={this.props.onReschedule}
                    onClose={this.handleRescheduleDialogClose}
                />
            </div>
        )
    }
}

export default WorkoutCard