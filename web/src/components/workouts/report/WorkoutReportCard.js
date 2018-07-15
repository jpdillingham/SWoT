import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import { ActionAssignmentTurnedIn, ActionDelete, ActionWatchLater, ActionSpeakerNotes } from 'material-ui/svg-icons';
import { black, red500 } from 'material-ui/styles/colors'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import List from 'material-ui/List'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import ConfirmDialog from '../../shared/ConfirmDialog'

import { getElapsedTime } from '../../../util'
import { WORKOUT_AVATAR_COLOR } from '../../../constants'
import { fontContrastColor } from '../../../util'

import ExerciseReportCard from '../../exercises/ExerciseReportCard'
import LeftRightListItem from '../../shared/LeftRightListItem';
import ToggledLeftRightListItem from '../../shared/ToggledLeftRightListItem';

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
}

const initialState = {
    deleteDialog: {
        open: false,
    },
}

class WorkoutReportCard extends Component {
    state = initialState;

    handleDeleteClick = () => {
        this.setState({ deleteDialog: { open: true }})
    }

    handleDeleteDialogClose = (result) => {
        if (result.cancelled) { 
            this.setState({ deleteDialog: { open: false }})
        }
    }

    handleEditClick = () => {
        this.navigate(this.props.location.pathname + '/edit');
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    render() {
        let color = this.props.workout.routine.color;
        color = !color || color === 0 ? red500 : color;
        let fontColor = fontContrastColor(color);

        return (
            <div>
            <Card zDepth={2} style={ styles.card }>
                <CardHeader                        
                    titleStyle={{ ...styles.cardTitle, color: fontColor }}
                    style={{ ...styles.cardHeader, backgroundColor: color }}
                    title={this.props.workout.routine.name}
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
                </CardHeader>
                <IconMenu
                    style={styles.iconMenu}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Edit" onClick={this.handleEditClick}/>
                    <MenuItem primaryText="Delete" onClick={this.handleDeleteClick} leftIcon={<ActionDelete/>}/>
                </IconMenu>
                <CardText>
                    {this.props.workout.routine.exercises.map((e, index) => 
                        <ExerciseReportCard key={index} exercise={e}/>
                    )}
                    <List>
                        <LeftRightListItem
                            leftIcon={<ActionWatchLater color={black}/>}
                            leftText={'Duration'}
                            rightText={getElapsedTime(this.props.workout.startTime, this.props.workout.endTime)}
                        />
                        <ToggledLeftRightListItem
                            leftIcon={<ActionSpeakerNotes color={black}/>}
                            leftText={'Notes'}
                            defaultToggleOpen={true}
                        >
                            {!this.props.workout.notes ? '' : <p>{this.props.workout.notes}</p>}
                        </ToggledLeftRightListItem>
                    </List>
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

export default withRouter(WorkoutReportCard)