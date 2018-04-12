import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import { black } from 'material-ui/styles/colors'

import { WORKOUT_AVATAR_COLOR } from '../../constants'
import { List, ListItem } from 'material-ui/List';

const styles = {
    cardHeader: {
        backgroundColor: WORKOUT_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
}

class WorkoutList extends Component {
    render() {
        return (
            <div>
                {this.props.workouts && this.props.workouts.length > 0 ? 
                    <Card zDepth={2} style={styles.card}>
                        <CardHeader
                            title={this.props.title}
                            titleStyle={styles.cardTitle}
                            style={styles.cardHeader}
                            avatar={<Avatar backgroundColor={WORKOUT_AVATAR_COLOR} color={black} size={36} icon={this.props.icon}></Avatar>}
                        />
                        <CardText>
                            <List>
                                {this.props.workouts.map(w => 
                                    <ListItem
                                        key={w.id}
                                        primaryText={w.routine.name}
                                        secondaryText={w.startTime}
                                        leftIcon={<ActionAssignmentTurnedIn/>}
                                        rightIcon={this.props.itemRightIcon}
                                    />
                                )}
                            </List>
                        </CardText>
                    </Card>
                : '' }
            </div>
        )
    }
}

export default WorkoutList