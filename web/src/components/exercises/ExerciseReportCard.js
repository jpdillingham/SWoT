import React, { Component } from 'react';

import ActionHistory from 'material-ui/svg-icons/action/history';
import Avatar from 'material-ui/Avatar';
import { black } from 'material-ui/styles/colors';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import { grey300 } from 'material-ui/styles/colors';

import Spinner from '../shared/Spinner';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import { getElapsedTime } from '../../util';

import SaveRetryFlatButton from '../shared/SaveRetryFlatButton';
import ExerciseHistoryDialog from './history/ExerciseHistoryDialog';
import { List } from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';

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
        width: CARD_WIDTH - 100,
        height: '100%',
        position: 'relative',
        marginBottom: 20,
        marginLeft: 5,
        marginTop: 5,
    },
    fab: {
        margin: 0,
        top: 47,
        right: 20,
        bottom: 'auto',
        left: 'auto',
        position: 'absolute',
        zIndex: 1000,
    },
    link: {
        cursor: 'pointer',
    },
    button: {
        float: 'right',
    },
    time: {
        color: black,
    },
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
                                    <ListItem
                                        key={index}
                                        primaryText={this.getMetricDisplayName(m)}
                                        secondaryText={m.value}
                                    />
                                ) : ''
                            }
                            {this.props.exercise.notes ? 
                            <ListItem
                                primaryText={'Notes'}
                                secondaryText={this.props.exercise.notes}
                            /> : ''}
                        </List>
                    </CardText>
                    <CardActions>
                        <FlatButton 
                            label={this.props.exercise.startTime ? getElapsedTime(this.props.exercise.startTime, this.props.exercise.endTime) : ' '} 
                            disabled={true} 
                            style={styles.time}
                        />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default ExerciseReportCard