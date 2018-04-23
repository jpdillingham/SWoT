import React, { Component } from 'react';

import {Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import ActionHistory from 'material-ui/svg-icons/action/history';
import Avatar from 'material-ui/Avatar';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';

import SaveRetryFlatButton from '../shared/SaveRetryFlatButton';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import FlatButton from 'material-ui/FlatButton/FlatButton';

const styles = {
    container: {
        height: '100%'
    },
    cardHeader: {
        backgroundColor: EXERCISE_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    iconMenu: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
    card: {
        width: CARD_WIDTH - 40,
        height: '100%',
        position: 'relative',
        marginBottom: 5,
        marginLeft: 5,
        marginTop: 20
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
}

const initialState = {
    exercise: undefined,
    api: {
        isExecuting: false,
        isErrored: false,
    },
    validationErrors: {}
}

class WorkoutExerciseForm extends Component {
    state = initialState;

    componentWillMount = () => {
        this.setState({ ...this.state, exercise: { ...this.props.exercise }});
    }

    handleHistoryClick = () => { }

    handleMetricChange = (event, value, metric) => {
        this.setState({ 
            ...this.state, 
            exercise: { 
                ...this.state.exercise,
                metrics: this.state.exercise.metrics.map(m => {
                    return m.name === metric.name ? { ...metric, value: value } : m;
                })
            },
            validationErrors: {
                ...this.state.validationErrors,
                [metric.name]: ''
            }
        });
    }

    getValidationErrors = (state) => {
        let errors = {};

        state.exercise.metrics.forEach(m => {
            errors[m.name] = !m.value || m.value === '' ? 'A value for ' + m.name + ' must be provided.' : '';
        })

        return errors;
    }

    handleNotesChange = (event, value) => {
        this.setState({ ...this.state, notes: value });
    }
    
    handleSaveClick = () => {
        this.setState({
            ...this.state,
            validationErrors: this.getValidationErrors(this.state)
        }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== '') === undefined) {
                this.setState({ 
                    api: { ...this.state.api, isExecuting: true },
                    exercise: { ...this.state.exercise, endDate: Date.now() }
                }, () => {
                    this.props.onChange(this.state.exercise)
                    .then((response) => {
                        this.setState({ api: { ...this.state.api, isExecuting: false }})
                    }, (error) => {
                        this.setState({ api: { isExecuting: false, isErrored: true }})
                    })
                })
            }
        })
    }

    getMetricDisplayName = (metric) => {
        return metric.name + (metric.uom ? ' (' + metric.uom + ')' : '')
    }

    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown'
        }

        return (
            <div style={styles.container}>
                <Card zDepth={2} style={styles.card}>
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
                        <FloatingActionButton 
                            secondary={false} 
                            zDepth={2} 
                            style={styles.fab}
                            mini={true}
                            onClick={this.handleHistoryClick}
                        >
                            <ActionHistory />
                        </FloatingActionButton>
                    </CardHeader>
                    <CardText style={styles.text}>
                            {this.props.exercise.metrics ? 
                                this.props.exercise.metrics.map((m, index) =>    
                                    <TextField
                                        key={index}
                                        hintText={this.getMetricDisplayName(m)}
                                        defaultValue={m.value}
                                        errorText={this.state.validationErrors[m.name]}
                                        floatingLabelText={this.getMetricDisplayName(m)}
                                        onChange={(e,v) => this.handleMetricChange(e,v,m)}
                                    />
                                ) : ''
                            }
                            <TextField
                                hintText={'Notes'}
                                floatingLabelText={'Notes'}
                                multiLine={true}
                                onChange={this.handleNotesChange}
                            />
                    </CardText>
                    <CardActions>
                        <SaveRetryFlatButton 
                            label={'Complete'}
                            onClick={this.handleSaveClick} 
                            api={this.state.api} 
                            validation={this.state.validationErrors} 
                            style={styles.button}
                        />
                        <SaveRetryFlatButton 
                            label={'Start'}
                            onClick={this.handleSaveClick} 
                            api={this.state.api} 
                            validation={this.state.validationErrors} 
                            style={styles.button}
                        />
                        <FlatButton label={' '} disabled={true}/> {/* lazy fix for positioning */}
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default WorkoutExerciseForm