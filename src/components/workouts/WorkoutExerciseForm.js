import React, { Component } from 'react';

import ActionHistory from 'material-ui/svg-icons/action/history';
import Avatar from 'material-ui/Avatar';
import { black } from 'material-ui/styles/colors';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import { getElapsedTime } from '../../util';

import SaveRetryFlatButton from '../shared/SaveRetryFlatButton';

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
    time: {
        color: black,
    }
}

const initialState = {
    ticker: 0,
    exercise: undefined,
    api: {
        isExecuting: false,
        isErrored: false,
    },
    validationErrors: {}
}

class WorkoutExerciseForm extends Component {
    state = { ...initialState, exercise: { ...this.props.exercise }};

    timer;

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
        this.setState({ exercise: { ...this.state.exercise, notes: value }});
    }
    
    handleCompleteClick = () => {
        this.setState({
            ...this.state,
            validationErrors: this.getValidationErrors(this.state)
        }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== '') === undefined) {
                this.invokeOnChange({ ...this.state.exercise, endTime: Date.now() })
            }
        })
    }

    handleStartClick = () => {
        this.invokeOnChange({ ...this.state.exercise, startTime: new Date().getTime() })
    }

    handleRestartClick = () => {
        this.invokeOnChange({ ...this.props.exercise, startTime: new Date().getTime(), endTime: undefined })
    }

    invokeOnChange = (exercise) => {
        this.setState({ 
            api: { ...this.state.api, isExecuting: true }
        }, () =>
            this.props.onChange(exercise)
            .then(() => {
                this.setState({ api: { ...this.state.api, isExecuting: false }})
            }, error => {
                this.setState({ api: { isExecuting: false, isErrored: true }})
            })
        )
    }

    getMetricDisplayName = (metric) => {
        return metric.name + (metric.uom ? ' (' + metric.uom + ')' : '')
    }

    componentDidMount = () => {
        this.timer = setInterval(() => this.setState({ ticker: this.state.ticker + 1 }), 1000);
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }

    componentWillReceiveProps = (newProps) => {
        let complete = this.state.exercise.startTime !== undefined && this.state.exercise.endTime !== undefined;

        this.setState({ ...this.state, exercise: newProps.exercise }, () => {
            if (!complete && this.state.exercise.startTime !== undefined && this.state.exercise.endTime !== undefined) {
                this.props.onComplete();
            }
        });
    }

    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown'
        }

        return (
            <div>
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
                                    disabled={this.props.exercise.endTime !== undefined || this.props.exercise.startTime === undefined}
                                />
                            ) : ''
                        }
                        <TextField
                            hintText={'Notes'}
                            floatingLabelText={'Notes'}
                            defaultValue={this.props.exercise.notes}
                            multiLine={true}
                            onChange={this.handleNotesChange}
                            disabled={this.props.exercise.endTime !== undefined  || this.props.exercise.startTime === undefined}
                        />
                    </CardText>
                    <CardActions>
                        {!this.props.exercise.startTime ? 
                            <SaveRetryFlatButton 
                                label={'Start'}
                                onClick={this.handleStartClick} 
                                api={this.state.api} 
                                validation={this.state.validationErrors} 
                                style={styles.button}
                            /> : !this.props.exercise.endTime ?
                            <SaveRetryFlatButton 
                                label={'Complete'}
                                onClick={this.handleCompleteClick} 
                                api={this.state.api} 
                                validation={this.state.validationErrors} 
                                style={styles.button}
                            /> : 
                            <SaveRetryFlatButton 
                                label={'Restart'}
                                onClick={this.handleRestartClick} 
                                api={this.state.api} 
                                validation={this.state.validationErrors} 
                                style={styles.button}
                            /> 
                        }
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

export default WorkoutExerciseForm