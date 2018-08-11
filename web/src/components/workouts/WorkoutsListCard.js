import React, { Component } from 'react';
import moment from 'moment';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import { black, grey300, red500 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

import { WORKOUT_AVATAR_COLOR } from '../../constants';
import { List, ListItem } from 'material-ui/List';
import Spinner from '../shared/Spinner';
import { fontContrastColor } from '../../util';

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
        marginTop: 10,
    },
    footerDivider: {
        marginBottom: 10,
    },
};

class WorkoutsListCard extends Component {
    sort = (a, b) => {
        let f = this.props.timeField;
        if (this.props.sort.toLowerCase() === 'desc') {
            return a[f] > b[f] ? -1 : 
                a[f] === b[f] ? 0 : 1; 
        }
        else {
            return a[f] < b[f] ? -1 : 
                a[f] === b[f] ? 0 : 1; 
        }        
    }

    render() {
        return (
            (!this.props.workouts || this.props.workouts.length === 0) && this.props.hideIfEmpty ? '' :
                <Card 
                    zDepth={2}                 
                    style={!this.props.refreshing ? styles.card : 
                        { 
                            ...styles.card, 
                            backgroundColor: grey300, 
                        }
                    }
                >
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
                            {this.props.workouts && this.props.workouts.length > 0 ? this.props.workouts
                                .sort(this.sort)
                                .map((w, index) => {
                                    let color = !w.routine.color || w.routine.color === 0 ? red500 : w.routine.color;
                                    return (
                                        <ListItem
                                            key={index}
                                            primaryText={w.routine.name}
                                            secondaryText={this.props.timePrefix + ' ' + moment(w[this.props.timeField]).calendar()}
                                            leftAvatar={
                                                <Avatar 
                                                    style={{backgroundColor: color}} 
                                                    color={fontContrastColor(color)}
                                                    icon={<ActionAssignmentTurnedIn color={color}/>
                                                }/>
                                            }
                                            rightIcon={this.props.itemRightIcon}
                                            onClick={() => this.props.onClick(w.id)}
                                            disabled={this.props.refreshing}
                                        />
                                    );
                                }) : this.props.emptyContent
                            }
                        </List>
                        {this.props.children ? <Divider style={styles.footerDivider}/> : ''}
                        {this.props.children}
                        {this.props.refreshing ? <Spinner/> : ''}
                    </CardText>
                </Card> 
        );
    }
}

export default WorkoutsListCard;