import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import { List } from 'material-ui/List';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../../constants';
import { getElapsedTime, getUnixTimestamp } from '../../../util';

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
    },
    field: {
        width: '100%',
    },
}

class ExerciseEditorCard extends Component {
    getMetricDisplayName = (metric) => {
        return metric.name + (metric.uom ? ' (' + metric.uom + ')' : '')
    }

    handleMetricChange = (metric, value) => {
        let m = this.props.exercise.metrics
            .map(m => m.name === metric.name ? { ...m, value: value } : m);

        this.handlePropertyChange('metrics', m);
    }

    handlePropertyChange = (property, value) => {
        let e = { ...this.props.exercise, [property]: value };
        this.props.onChange(e);
    }

    areTimesValid = () => {
        return Number.isFinite(getUnixTimestamp(this.props.exercise.startTime)) && Number.isFinite(getUnixTimestamp(this.props.exercise.endTime));
    }

    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown'
        }

        let duration = this.areTimesValid() ? getElapsedTime(getUnixTimestamp(this.props.exercise.startTime), getUnixTimestamp(this.props.exercise.endTime)) : 'N/A';

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
                                    <TextField
                                        style={styles.field}
                                        key={index}
                                        hintText={this.getMetricDisplayName(m)}
                                        floatingLabelText={this.getMetricDisplayName(m)}
                                        onChange={(event, value) => this.handleMetricChange(m, value)}
                                        value={m.value ? m.value : ''}
                                    />
                                ) : ''
                            }
                            <TextField
                                style={styles.field}
                                hintText={'Start Time'}
                                floatingLabelText={'Start Time'}
                                errorText={!Number.isFinite(getUnixTimestamp(this.props.exercise.startTime)) ? "This isn't a valid date string." : ''}
                                onChange={(event, newValue) => this.handlePropertyChange('startTime', newValue)}
                                value={this.props.exercise.startTime}
                            /><br/>
                            <TextField
                                style={styles.field}
                                hintText={'End Time'}
                                floatingLabelText={'End Time'}
                                errorText={!Number.isFinite(getUnixTimestamp(this.props.exercise.endTime)) ? "This isn't a valid date string." : ''}
                                onChange={(event, newValue) => this.handlePropertyChange('endTime', newValue)}
                                value={this.props.exercise.endTime}
                            /><br/>
                            <TextField
                                style={styles.field}
                                hintText={'Duration'}
                                floatingLabelText={'Duration'}
                                value={duration}
                                disabled={true}
                            />
                            {!this.props.exercise.notes ? '' :
                                <TextField
                                    style={styles.field}
                                    hintText={'Notes'}
                                    floatingLabelText={'Notes'}
                                    multiLine={true}
                                    onChange={(event, newValue) => this.handlePropertyChange('notes', newValue)}
                                    value={this.props.exercise.notes ? this.props.exercise.notes : ''}
                                />
                            }
                        </List>
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default ExerciseEditorCard