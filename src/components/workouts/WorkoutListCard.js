import React, { Component } from 'react';
import moment from 'moment';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import { black } from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'

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
    headerDivider: {
        marginTop: 10
    },
    footerDivider: {
        marginBottom: 10
    }
}

class WorkoutListCard extends Component {
    render() {
        return (
            this.props.workouts && this.props.workouts.length > 0 ? 
                <Card zDepth={2} style={styles.card}>
                    <CardHeader
                        title={this.props.title}
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        avatar={<Avatar backgroundColor={WORKOUT_AVATAR_COLOR} color={black} size={36} icon={this.props.icon}></Avatar>}
                    />
                    <CardText>
                        {this.props.options}
                        {this.props.options ? <Divider style={styles.headerDivider}/> : ''}
                        <List>
                            {this.props.workouts
                                .sort((a, b) => { 
                                    let f = this.props.timeField;
                                    if (this.props.sort === 'desc') {
                                        return a[f] > b[f] ? -1 : 
                                            a[f] === b[f] ? 0 : 1 
                                    }
                                    else {
                                        return a[f] < b[f] ? -1 : 
                                            a[f] === b[f] ? 0 : 1 
                                    }
                                })
                                .map(w => 
                                    <ListItem
                                        key={w.id}
                                        primaryText={w.routine.name}
                                        secondaryText={this.props.timePrefix + ' ' + moment(w[this.props.timeField]).calendar()}
                                        leftIcon={<ActionAssignmentTurnedIn/>}
                                        rightIcon={this.props.itemRightIcon}
                                        onClick={() => this.props.onClick(w.id)}
                                    />
                            )}
                        </List>
                        {this.props.children ? <Divider style={styles.footerDivider}/> : ''}
                        {this.props.children}
                    </CardText>
                </Card>
            : '' 
        )
    }
}

export default WorkoutListCard