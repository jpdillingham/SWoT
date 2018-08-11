import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { List } from 'material-ui/List';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../../constants';
import { getElapsedTime, getUnixTimestamp } from '../../../util';
import { grey300 } from 'material-ui/styles/colors';

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
        marginLeft: 20,
    },
    field: {
        width: '100%',
    },
};

class ExerciseEditorCard extends Component {
    getMetricDisplayName = (metric) => {
        return metric.name + (metric.uom ? ' (' + metric.uom + ')' : '');
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
            exerciseImage = 'unknown';
        }

        let exercise = this.props.exercise;

        let duration = this.areTimesValid() ? getElapsedTime(getUnixTimestamp(this.props.exercise.startTime), getUnixTimestamp(this.props.exercise.endTime)) : 'N/A';

        return (
            <div>
                <Card 
                    zDepth={2} 
                    style={!this.props.disabled ? styles.card : { ...styles.card, backgroundColor: grey300 }}
                >
                    <CardHeader                        
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        title={
                            <span 
                                style={styles.link}
                                onClick={() => window.open(this.props.exercise.url)}
                            >
                                {exercise.name}
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
                            {exercise.metrics ? 
                                exercise.metrics.map((m, index) =>    
                                    <TextField
                                        style={styles.field}
                                        key={index}
                                        hintText={this.getMetricDisplayName(m)}
                                        floatingLabelText={this.getMetricDisplayName(m)}
                                        onChange={(event, value) => this.handleMetricChange(m, value)}
                                        value={m.value ? m.value : ''}
                                        disabled={this.props.disabled}
                                    />
                                ) : ''
                            }
                            <TextField
                                style={styles.field}
                                hintText={'Start Time'}
                                floatingLabelText={'Start Time'}
                                errorText={exercise.startTime && !Number.isFinite(getUnixTimestamp(exercise.startTime)) ? "This isn't a valid date string." : ''}
                                onChange={(event, newValue) => this.handlePropertyChange('startTime', newValue)}
                                value={exercise.startTime ? exercise.startTime : ''}
                                disabled={this.props.disabled}
                            /><br/>
                            <TextField
                                style={styles.field}
                                hintText={'End Time'}
                                floatingLabelText={'End Time'}
                                errorText={exercise.endTime && !Number.isFinite(getUnixTimestamp(exercise.endTime)) ? "This isn't a valid date string." : ''}
                                onChange={(event, newValue) => this.handlePropertyChange('endTime', newValue)}
                                value={exercise.endTime ? exercise.endTime : ''}
                                disabled={this.props.disabled}
                            /><br/>
                            <TextField
                                style={styles.field}
                                hintText={'Duration'}
                                floatingLabelText={'Duration'}
                                value={duration}
                                disabled={true}
                            />
                            <TextField
                                style={styles.field}
                                hintText={'Notes'}
                                floatingLabelText={'Notes'}
                                multiLine={true}
                                onChange={(event, newValue) => this.handlePropertyChange('notes', newValue)}
                                value={exercise.notes ? exercise.notes : ''}
                                disabled={this.props.disabled}
                            />
                        </List>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default ExerciseEditorCard;