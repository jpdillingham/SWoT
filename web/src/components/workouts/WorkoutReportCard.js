import React, { Component } from 'react'

import moment from 'moment';

import { black, grey300 } from 'material-ui/styles/colors'
import {Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { AvPlayArrow, AvStop, AvReplay } from 'material-ui/svg-icons';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField/TextField';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import { WORKOUT_AVATAR_COLOR } from '../../constants'

import WorkoutStepper from './WorkoutStepper';
import ConfirmDialog from '../shared/ConfirmDialog';
import Spinner from '../shared/Spinner';
import ExerciseReportCard from '../exercises/ExerciseReportCard'

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

class WorkoutReportCard extends Component {
    render() {
        return (
            <div>
            <Card zDepth={2} style={ styles.card }>
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
                </CardHeader>
                <IconMenu
                    style={styles.iconMenu}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem 
                        primaryText="Reset" 
                        onClick={this.handleResetClick} 
                        leftIcon={<AvReplay/>}
                        disabled={!this.props.workout.startTime}
                    />
                    <MenuItem primaryText="Delete" onClick={this.handleDeleteClick} leftIcon={<ActionDelete/>}/>
                </IconMenu>
                <CardText>
                    {this.props.workout.routine.exercises.map((e, index) => 
                        <ExerciseReportCard key={index} exercise={e}/>
                    )}
                </CardText>
            </Card>
        </div>

        )
    }
}

export default WorkoutReportCard