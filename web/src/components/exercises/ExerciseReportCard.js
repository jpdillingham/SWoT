import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import { ActionAssessment, ActionWatchLater, ActionSpeakerNotes, NavigationExpandLess, NavigationExpandMore } from 'material-ui/svg-icons';
import { black } from 'material-ui/styles/colors';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import LeftRightListItem from '../shared/LeftRightListItem'
import { List } from 'material-ui/List';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import { getElapsedTime } from '../../util';

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
    },
    notes: {
        marginLeft: 20
    }
}

const initialState = {
    notes: {
        expanded: true,
    },
}

class ExerciseReportCard extends Component {
    state = initialState;

    getMetricDisplayName = (metric) => {
        return metric.name + (metric.uom ? ' (' + metric.uom + ')' : '')
    }

    handleNotesToggle = () => {
        this.setState({ notes: { expanded: !this.state.notes.expanded }});
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
                            {!this.props.exercise.metrics ? '' :
                                this.props.exercise.metrics.map((m, index) =>    
                                    <LeftRightListItem
                                        key={index}
                                        leftIcon={<ActionAssessment color={ black }/>} 
                                        leftText={this.getMetricDisplayName(m)}
                                        rightText={m.value ? m.value : '-'}
                                    />
                                )
                            }
                            <LeftRightListItem
                                leftIcon={<ActionWatchLater color={ black }/>} 
                                leftText={'Duration'}
                                rightText={this.props.exercise.startTime ? getElapsedTime(this.props.exercise.startTime, this.props.exercise.endTime) : ' '} 
                            />
                            {!this.props.exercise.notes ? '' :
                                <div>
                                    <LeftRightListItem 
                                        leftIcon={<ActionSpeakerNotes color={ black }/>} 
                                        leftText={'Notes'}
                                        rightIcon={this.state.notes.expanded ? <NavigationExpandLess color={black}/> : <NavigationExpandMore color={black}/>}
                                        onClick={this.handleNotesToggle}
                                    />
                                    {this.state.notes.expanded ? <p style={styles.notes}>{this.props.exercise.notes}</p> : ''}
                                </div>
                            }
                        </List>
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default ExerciseReportCard