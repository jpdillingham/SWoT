import React, { Component } from 'react';

import ActionHistory from 'material-ui/svg-icons/action/history';
import ActionAssessment from 'material-ui/svg-icons/action/assessment'
import Avatar from 'material-ui/Avatar';
import { black } from 'material-ui/styles/colors';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import { grey300 } from 'material-ui/styles/colors';
import LeftRightListItem from '../shared/LeftRightListItem'

import Spinner from '../shared/Spinner';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import { getElapsedTime } from '../../util';

import SaveRetryFlatButton from '../shared/SaveRetryFlatButton';
import ExerciseHistoryDialog from './history/ExerciseHistoryDialog';
import { List } from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import { Table, TableRow, TableRowColumn } from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import { ActionSchedule, ActionWatchLater, ActionSpeakerNotes } from 'material-ui/svg-icons';

const styles = {
    cardHeader: {
        backgroundColor: EXERCISE_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    card: {
        width: CARD_WIDTH - 35,
        height: '100%',
        position: 'relative',
        marginBottom: 20,
        marginLeft: 5,
        marginTop: 5,
    },
    link: {
        cursor: 'pointer',
    }
}

class ExerciseReportCard extends Component {
    getMetricDisplayName = (metric) => {
        return metric.name + (metric.uom ? ' (' + metric.uom + ')' : '')
    }

    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown'
        }

        return (
            <div>
                <Card 
                    zDepth={2} 
                    style={styles.card}
                >
                    <CardHeader                        
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        title={
                            <span 
                                style={styles.link}
                                onClick={() => window.open(this.props.exercise.url)}
                            >
                                {this.props.exercise.name}
                            </span>
                        }
                        avatar={
                            <Avatar 
                                backgroundColor={EXERCISE_AVATAR_COLOR} 
                                size={32} 
                                src={process.env.PUBLIC_URL + '/img/' + exerciseImage.toLowerCase() + '.png'} 
                            />
                        }
                    >
                    </CardHeader>
                    <CardText style={styles.text}>
                        <List>
                            {this.props.exercise.metrics ? 
                                this.props.exercise.metrics.map((m, index) =>    
                                <LeftRightListItem
                                key={index}
                                leftIcon={<ActionAssessment color={ black }/>} 
                                leftText={this.getMetricDisplayName(m)}
                                rightText={m.value ? m.value : '-'}
                                />
                            ) : ''
                        }
                            {this.props.exercise.notes ? 
                                <LeftRightListItem 
                                leftIcon={<ActionSpeakerNotes color={ black }/>} 
                                leftText={'Notes'}
                                rightText={this.props.exercise.notes}
                                />: ''
                            }
                            <LeftRightListItem
                                leftIcon={<ActionWatchLater color={ black }/>} 
                                leftText={'Duration'}
                                rightText={this.props.exercise.startTime ? getElapsedTime(this.props.exercise.startTime, this.props.exercise.endTime) : ' '} 
                            />
                        </List>
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default ExerciseReportCard