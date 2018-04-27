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

import { WORKOUT_AVATAR_COLOR } from '../../constants'

import WorkoutStepper from './WorkoutStepper';

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
}

class WorkoutCard extends Component {
    handleStartStopClick = () => {
        let workout = { ...this.props.workout };

        if (workout.startTime === undefined) {
            workout.startTime = new Date().getTime();
        }
        else if (workout.endTime === undefined) {
            workout.endTime = new Date().getTime();
        }

        this.props.onWorkoutChange(workout);
    }

    render() {
        return (
            <Card zDepth={2} style={styles.card}>
                <CardHeader                        
                    titleStyle={styles.cardTitle}
                    style={styles.cardHeader}
                    title={this.props.workout.routine.name}
                    subtitle={'Started ' + moment(this.props.workout.startTime).calendar()}
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
                    <MenuItem primaryText="Reset" onClick={this.props.onResetClick} />
                    <MenuItem primaryText="Delete" onClick={this.props.onDeleteClick} />
                </IconMenu>
                <CardText>
                    {this.props.workout.startTime === undefined ? 
                        <p>press start</p> :
                        <WorkoutStepper
                            style={styles.stepper}
                            workout={this.props.workout}
                            onExerciseChange={this.props.onExerciseChange}
                        />
                    }
                </CardText>
            </Card>
        )
    }
}

export default WorkoutCard