import React, { Component } from 'react';
import moment from 'moment';

import { black } from 'material-ui/styles/colors'
import {Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { AvPlayArrow, AvStop } from 'material-ui/svg-icons';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField/TextField';

import { WORKOUT_AVATAR_COLOR } from '../../constants'

import WorkoutStepper from './WorkoutStepper';
import ConfirmDialog from '../shared/ConfirmDialog';

const styles = {
    cardHeader: {
        backgroundColor: WORKOUT_AVATAR_COLOR,
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
    }
}

const initialState = {
    deleteDialog: {
        open: false,
    },
    resetDialog: {
        open: false,
    },
    workout: {
        notes: '',
    }
}

class WorkoutCard extends Component {
    state = initialState;

    handleStartStopClick = () => {
        let workout = { 
            ...this.props.workout,
            notes: this.state.workout.notes
        };

        if (workout.startTime === undefined) {
            workout.startTime = new Date().getTime();
        }
        else if (workout.endTime === undefined) {
            workout.endTime = new Date().getTime();
        }

        this.props.onWorkoutChange(workout);
    }

    handleNotesChange = (event, value) => {
        this.setState({ workout: { ...this.state.workout, notes: value }})
    }

    handleDeleteClick = () => {
        this.setState({ deleteDialog: { open: true }})
    }

    handleDeleteDialogClose = (result) => {
        this.setState({ deleteDialog: { open: false }})
    }

    handleResetClick = () => {
        this.setState({ resetDialog: { open: true }})
    }

    handleResetDialogClose = (result) => {
        this.setState({ resetDialog: { open: false }})
    }

    render() {
        return (
            <div>
                <Card zDepth={2} style={styles.card}>
                    <CardHeader                        
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        title={this.props.workout.routine.name}
                        subtitle={
                            this.props.workout.startTime === undefined ? 'Scheduled for ' + moment(this.props.workout.scheduledTime).calendar() :
                            'Started ' + moment(this.props.workout.startTime).calendar()
                        }
                        avatar={
                            <Avatar 
                                backgroundColor={WORKOUT_AVATAR_COLOR} 
                                size={40} 
                                color={black}
                                icon={<ActionAssignmentTurnedIn/>} 
                            />
                        }
                    >
                        <FloatingActionButton 
                            secondary={false} 
                            zDepth={2} 
                            style={styles.fab}
                            mini={true}
                            onClick={this.handleStartStopClick}
                        >
                            {this.props.workout.startTime === undefined ? <AvPlayArrow/> : <AvStop/> }
                        </FloatingActionButton>
                    </CardHeader>
                    <IconMenu
                        style={styles.iconMenu}
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="Reset" onClick={this.handleResetClick} />
                        <MenuItem primaryText="Delete" onClick={this.handleDeleteClick} />
                    </IconMenu>
                    <CardText>
                        <WorkoutStepper
                            enabled={this.props.workout.startTime !== undefined}
                            style={styles.stepper}
                            workout={this.props.workout}
                            onExerciseChange={this.props.onExerciseChange}
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
                    </CardText>
                </Card>
                <ConfirmDialog 
                    title={'Delete Workout'}
                    prompt={'Are you sure you want to delete Workout \'' + this.props.workout.routine.name + '\'?'}
                    buttonCaption={'Delete'}
                    onConfirm={this.props.onDelete}
                    onClose={this.handleDeleteDialogClose}
                    open={this.state.deleteDialog.open} 
                />
                <ConfirmDialog 
                    title={'Reset Workout'}
                    prompt={'Are you sure you want to reset Workout \'' + this.props.workout.routine.name + '\'?<br/>All data will be lost!'}
                    buttonCaption={'Reset'}
                    onConfirm={this.props.onReset}
                    onClose={this.handleResetDialogClose}
                    open={this.state.resetDialog.open} 
                />
            </div>
        )
    }
}

export default WorkoutCard