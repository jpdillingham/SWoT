import React, { Component } from 'react';
import moment from 'moment';

import { black } from 'material-ui/styles/colors'
import {Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';

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
}

class WorkoutCard extends Component {
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
                </CardHeader>
                <CardText>
                    <WorkoutStepper
                        style={styles.stepper}
                        workout={this.props.workout}
                        onExerciseChange={this.props.onExerciseChange}
                    />
                </CardText>
            </Card>
        )
    }
}

export default WorkoutCard