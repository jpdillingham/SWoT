import React, { Component } from 'react';
import moment from 'moment';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import { black, grey300 } from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'

import { WORKOUT_AVATAR_COLOR } from '../../../constants'
import { List, ListItem } from 'material-ui/List';
import Spinner from '../Spinner';

const styles = {
    cardHeader: {
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

class HistoryCard extends Component {
    sort = (a, b) => {
        let f = this.props.timeField;
        if (this.props.sort.toLowerCase() === 'desc') {
            return a[f] > b[f] ? -1 : 
                a[f] === b[f] ? 0 : 1 
        }
        else {
            return a[f] < b[f] ? -1 : 
                a[f] === b[f] ? 0 : 1 
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
                            backgroundColor: grey300 
                        }
                    }
                >
                    <CardHeader
                        title={this.props.title}
                        titleStyle={styles.cardTitle}
                        style={{ ...styles.cardHeader, backgroundColor: this.props.color}}
                        avatar={<Avatar backgroundColor={this.props.color} color={black} size={36} icon={this.props.icon}></Avatar>}
                    />
                    <CardText>
                        {this.props.header}
                        {this.props.header ? <Divider style={styles.headerDivider}/> : ''}
                        {this.props.children}
                        {this.props.footer ? <Divider style={styles.footerDivider}/> : ''}
                        {this.props.footer}
                        {this.props.refreshing ? <Spinner/> : ''}
                    </CardText>
                </Card> 
        )
    }
}

export default HistoryCard