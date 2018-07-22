import React, { Component } from 'react'
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import { ActionAssignmentTurnedIn, ActionDelete, ContentSave } from 'material-ui/svg-icons';
import { red500 } from 'material-ui/styles/colors'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import ConfirmDialog from '../../shared/ConfirmDialog'

import { getElapsedTime } from '../../../util'
import { WORKOUT_AVATAR_COLOR } from '../../../constants'
import { fontContrastColor } from '../../../util'

import ExerciseEditorCard from '../../exercises/editor/ExerciseEditorCard'
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';

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
}

const initialState = {
    deleteDialog: {
        open: false,
    },
    workout: undefined,
    validationErrors: {},
}

class WorkoutEditorCard extends Component {
    state = initialState;

    componentWillMount = () => {
        this.setState({ workout: this.props.workout });
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ workout: nextProps.workout });
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
        this.setState({ workout: { ...this.state.workout, [property]: value }}, () => console.log('Update state:', this.state.workout));
    }

    handleTimePropertyChange = (property, stringValue) => {
        let value = parseInt((new Date(stringValue).getTime()).toFixed(0), 10);

        this.setState({ 
            workout: { ...this.state.workout, [property]: Number.isInteger(value) ? value : stringValue },
        }, () => console.log('Update state:', this.state.workout));       
    }

    handleExerciseChange = (exercise) => {
        this.setState({ 
            workout: {
                ...this.state.workout,
                routine: {
                    ...this.state.workout.routine,
                    exercises: this.state.workout.routine.exercises.map(e => e.id === exercise.id && e.sequence === exercise.sequence ? exercise : e),                    
                },
            },
        });
    }

    handleSaveClick = () => {
        let startTimeMsg = '';
        let endTimeMsg = '';

        if (!Number.isFinite(this.state.workout.startTime)) {
            startTimeMsg = "The start time isn't a valid ISO time string.";
        }
        
        if (!Number.isFinite(this.state.workout.endTime)) {
            endTimeMsg = "The end time isn't a valid ISO time string.";
        }

        if (!startTimeMsg && !endTimeMsg) {
            if (this.state.workout.startTime > this.state.workout.endTime) {
                startTimeMsg = 'The start time must be before the end time.';
                endTimeMsg = startTimeMsg;
            }
        }

        this.setState({
            validationErrors: {
                ...this.state.validationErrors,
                startTime: startTimeMsg,
                endTime: endTimeMsg,
            }
        }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== '') === undefined) {
                this.props.onChange(this.state.workout);
            }
        })
    }

    render() {
        let color = this.props.workout.routine.color;
        color = !color || color === 0 ? red500 : color;
        let fontColor = fontContrastColor(color);

        let workout = this.state.workout;

        return (
            <div>
            <Card zDepth={2} style={ styles.card }>
                <CardHeader                        
                    titleStyle={{ ...styles.cardTitle, color: fontColor }}
                    style={{ ...styles.cardHeader, backgroundColor: color }}
                    title={'Editing ' + this.props.workout.routine.name}
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
                            onChange={this.handleExerciseChange}
                        />
                    )}
                    <TextField
                        style={styles.field}
                        hintText={'Start Time'}
                        floatingLabelText={'Start Time'}
                        errorText={this.state.validationErrors.startTime}
                        onChange={(event, newValue) => this.handleTimePropertyChange('startTime', newValue)}
                        value={workout.startTime && Number.isFinite(workout.startTime) ? new Date(workout.startTime).toString().split(' ').slice(0, 6).join(' ') : workout.startTime}
                    /><br/>
                    <TextField
                        style={styles.field}
                        hintText={'End Time'}
                        floatingLabelText={'End Time'}
                        errorText={this.state.validationErrors.endTime}
                        onChange={(event, newValue) => this.handleTimePropertyChange('endTime', newValue)}
                        value={workout.endTime && Number.isFinite(workout.endTime) ? new Date(workout.endTime).toString().split(' ').slice(0, 6).join(' ') : workout.endTime}
                    /><br/>
                    <TextField
                        style={styles.field}
                        hintText={'Duration'}
                        floatingLabelText={'Duration'}
                        value={getElapsedTime(workout.startTime, workout.endTime)}
                        disabled={true}
                    /><br/>
                    <TextField
                        style={styles.field}
                        hintText={'Notes'}
                        floatingLabelText={'Notes'}
                        multiLine={true}
                        onChange={(event, newValue) => this.handlePropertyChange('notes', newValue)}
                        value={workout.notes ? workout.notes : ''}
                    />
                </CardText>
                <CardActions style={styles.actions}>
                    <FlatButton label="Cancel"/>
                    <FlatButton label="Save"/>
                </CardActions>
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