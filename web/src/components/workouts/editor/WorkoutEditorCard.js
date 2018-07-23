import React, { Component } from 'react'
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import { ActionAssignmentTurnedIn, ActionDelete, ContentSave } from 'material-ui/svg-icons';
import { red500, grey300 } from 'material-ui/styles/colors'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import ConfirmDialog from '../../shared/ConfirmDialog'

import { getElapsedTime } from '../../../util'
import { WORKOUT_AVATAR_COLOR } from '../../../constants'
import { fontContrastColor, getUnixTimestamp } from '../../../util'

import ExerciseEditorCard from '../../exercises/editor/ExerciseEditorCard'
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import Spinner from '../../shared/Spinner';

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
    iconMenu: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
    notes: {
        marginLeft: 20
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
    actions: {
        textAlign: 'right',
    },
    field: {
        width: '100%',
    },
    spinner: {
        zIndex: 1000,
    },
}

const initialState = {
    api: {
        isExecuting: false,
        isErrored: false,
    },
    deleteDialog: {
        open: false,
    },
    workout: undefined,
}

class WorkoutEditorCard extends Component {
    state = initialState;

    componentWillMount = () => {
        this.convertToFriendlyTimes(this.props.workout.routine.exercises);
    }

    convertToFriendlyTimes = (exercises) => {
        let e = exercises;
        e = e.map(e => { 
            return { 
                ...e, 
                startTime: new Date(e.startTime).toString().split(' ').slice(0, 6).join(' '),
                endTime: new Date(e.endTime).toString().split(' ').slice(0, 6).join(' '),
            } 
        });

        let w = { 
            ...this.props.workout,
            startTime: new Date(this.props.workout.startTime).toString().split(' ').slice(0, 6).join(' '),
            endTime: new Date(this.props.workout.endTime).toString().split(' ').slice(0, 6).join(' '),
            routine: {
                ...this.props.workout.routine,
                exercises: e,
            },
        };

        this.setState({ workout: w });
    }

    componentWillReceiveProps = (nextProps) => {
        this.convertToFriendlyTimes(nextProps.workout.routine.exercises);
    }

    handleDeleteClick = () => {
        this.setState({ deleteDialog: { open: true }})
    }

    handleDeleteDialogClose = (result) => {
        if (result.cancelled) { 
            this.setState({ deleteDialog: { open: false }})
        }
    }

    handlePropertyChange = (property, value) => {
        this.setState({ 
            workout: { ...this.state.workout, [property]: value },
        });
    }

    handleExerciseChange = (exercise) => {
        this.setState({ 
            workout: {
                ...this.state.workout,
                routine: {
                    ...this.state.workout.routine,
                    exercises: this.state.workout.routine.exercises
                        .map(e => e.id === exercise.id && e.sequence === exercise.sequence ? exercise : e),                    
                },
            },
        });
    }

    handleSaveClick = () => {
        if (this.areTimesValid()) {
            this.setState({ api: { ...this.state.api, isExecuting: true }}, () => {
                this.props.onChange({ 
                    ...this.state.workout, 
                    startTime: getUnixTimestamp(this.state.workout.startTime), 
                    endTime: getUnixTimestamp(this.state.workout.endTime),
                })
                .then(() => {
                    this.setState({ api: { isExecuting: false, isErrored: false }});
                }, error => {
                    this.setState({ api: { isExecuting: false, isErrored: true }});
                })
            })
        }
    }

    areTimesValid = () => {
        let workoutValid = Number.isFinite(getUnixTimestamp(this.state.workout.startTime)) && Number.isFinite(getUnixTimestamp(this.state.workout.endTime));
        let exercisesValid = this.state.workout.routine.exercises.find(e => 
            !Number.isFinite(getUnixTimestamp(e.startTime)) || !Number.isFinite(getUnixTimestamp(e.endTime))) === undefined;

        return workoutValid && exercisesValid;
    }

    render() {
        let color = this.props.workout.routine.color;
        color = !color || color === 0 ? red500 : color;
        let fontColor = fontContrastColor(color);

        let workout = this.state.workout;
        let duration = this.areTimesValid() ? getElapsedTime(getUnixTimestamp(this.state.workout.startTime), getUnixTimestamp(this.state.workout.endTime)) : 'N/A';
        
        let refreshing = this.state.api.isExecuting;

        return (
            <div>
            <Card zDepth={2} style={!this.state.api.isExecuting ? styles.card : { ...styles.card, backgroundColor: grey300 }}>
                <CardHeader                        
                    titleStyle={{ ...styles.cardTitle, color: fontColor }}
                    style={{ ...styles.cardHeader, backgroundColor: color }}
                    title={'Editing: ' + this.props.workout.routine.name}
                    subtitle={
                        'Completed ' + moment(this.props.workout.endTime).calendar()
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
                        onClick={this.handleSaveClick}
                    >
                        <ContentSave />
                    </FloatingActionButton>
                </CardHeader>
                <IconMenu
                    style={styles.iconMenu}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Delete" onClick={this.handleDeleteClick} leftIcon={<ActionDelete/>}/>
                </IconMenu>
                <CardText>
                    {this.state.workout.routine.exercises.map((e, index) => 
                        <ExerciseEditorCard 
                            key={index} 
                            exercise={e}
                            validationErrors={this.state.validationErrors}
                            onChange={this.handleExerciseChange}
                        />
                    )}
                    <TextField
                        style={styles.field}
                        hintText={'Start Time'}
                        floatingLabelText={'Start Time'}
                        errorText={!Number.isFinite(getUnixTimestamp(workout.startTime)) ? "This isn't a valid date string." : ''}
                        onChange={(event, newValue) => this.handlePropertyChange('startTime', newValue)}
                        value={workout.startTime}
                        disabled={refreshing}
                    />
                    <TextField
                        style={styles.field}
                        hintText={'End Time'}
                        floatingLabelText={'End Time'}
                        errorText={!Number.isFinite(getUnixTimestamp(workout.endTime)) ? "This isn't a valid date string." : ''}
                        onChange={(event, newValue) => this.handlePropertyChange('endTime', newValue)}
                        value={workout.endTime}
                        disabled={refreshing}
                    />
                    <TextField
                        style={styles.field}
                        hintText={'Duration'}
                        floatingLabelText={'Duration'}
                        value={duration}
                        disabled={true}
                    />
                    <TextField
                        style={styles.field}
                        hintText={'Notes'}
                        floatingLabelText={'Notes'}
                        multiLine={true}
                        onChange={(event, newValue) => this.handlePropertyChange('notes', newValue)}
                        value={workout.notes ? workout.notes : ''}
                        disabled={refreshing}
                    />
                    {this.state.api.isExecuting ? <Spinner style={styles.spinner}/> : ''}
                </CardText>
            </Card>
            <ConfirmDialog 
                title={'Delete Workout History'}
                buttonCaption={'Delete'}
                onConfirm={this.props.onDelete}
                onClose={this.handleDeleteDialogClose}
                open={this.state.deleteDialog.open} 
            >
                Are you sure you want to delete the history for Workout '{this.props.workout.routine.name}'?
            </ConfirmDialog>
        </div>

        )
    }
}

export default WorkoutEditorCard