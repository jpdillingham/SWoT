import React, { Component } from 'react';

import ActionHistory from 'material-ui/svg-icons/action/history';
import Avatar from 'material-ui/Avatar';
import { black } from 'material-ui/styles/colors';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import { grey300 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Spinner from '../shared/Spinner';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import { getElapsedTime } from '../../util';

import SaveRetryFlatButton from '../shared/SaveRetryFlatButton';
import ExerciseHistoryDialog from './history/ExerciseHistoryDialog';
import ExerciseProgressDialog from './history/ExerciseProgressDialog';
import { AvPlayArrow, AvStop, AvFastRewind } from 'material-ui/svg-icons';

const styles = {
    cardHeader: {
        backgroundColor: EXERCISE_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
    },
    card: {
        width: CARD_WIDTH - 100,
        height: '100%',
        position: 'relative',
        marginBottom: 5,
        marginLeft: 5,
        marginTop: 20,
    },
    fab: {
        margin: 0,
        top: 47,
        right: 40,
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
    iconMenu: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
}

const initialState = {
    ticker: 0,
    exercise: undefined,
    api: {
        isExecuting: false,
        isErrored: false,
    },
    historyDialog: {
        open: false,
    },
    progressDialog: {
        open: false,
    },
    validationErrors: {}
}

class ExerciseForm extends Component {
    state = { ...initialState, exercise: { ...this.props.exercise }};

    timer;

    handleHistoryClick = () => { 
        this.setState({ historyDialog: { open: true }});
    }

    handleHistoryClose = () => {
        this.setState({ historyDialog: { open: false }});
    }

    handleProgressClick = () => { 
        this.setState({ progressDialog: { open: true }});
    }

    handleProgressClose = () => {
        this.setState({ progressDialog: { open: false }});
    }

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

    handleActionClick = () => {
        if (!this.props.exercise.startTime) {
            this.invokeOnChange({ ...this.state.exercise, startTime: new Date().getTime() });
        }
        else if (!this.props.exercise.endTime) {
            this.setState({
                ...this.state,
                validationErrors: this.getValidationErrors(this.state)
            }, () => {
                if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== '') === undefined) {
                    this.invokeOnChange({ ...this.state.exercise, endTime: Date.now() })
                }
            })
        }
        else {
            this.invokeOnChange({ ...this.props.exercise, startTime: new Date().getTime(), endTime: undefined })
        }
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

        let started = this.props.exercise.startTime;

        return (
            <div>
                <Card 
                    zDepth={2} 
                    style={!this.state.api.isExecuting ? styles.card : 
                        { 
                            ...styles.card, 
                            backgroundColor: grey300 
                        }
                    }
                >
                    <CardHeader                        
                        titleStyle={{ ...styles.cardTitle, marginTop: started ? 0 : 6 }}
                        style={styles.cardHeader}
                        title={
                            <span 
                                style={styles.link}
                                onClick={() => window.open(this.props.exercise.url)}
                            >
                                {this.props.exercise.name}
                            </span>
                        }
                        subtitle={started ? 'Elapsed time ' + getElapsedTime(this.props.exercise.startTime, this.props.exercise.endTime) : undefined}
                        avatar={
                            <Avatar 
                                style={{marginTop: started ? 4 : 0}}
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
                            onClick={this.handleActionClick}
                        >
                            {!started ? <AvPlayArrow/> :
                                !this.props.exercise.endTime ? <AvStop/> : <AvFastRewind/>
                            }
                        </FloatingActionButton>
                    </CardHeader>
                    <IconMenu
                            style={styles.iconMenu}
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="Progress" onClick={this.handleProgressClick} leftIcon={<ActionTrendingUp/>}/>
                        <MenuItem primaryText="History" onClick={this.handleHistoryClick} leftIcon={<ActionHistory/>}/>
                    </IconMenu>
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
                    {this.state.api.isExecuting ? <Spinner/> : ''}
                </Card>
                <ExerciseHistoryDialog
                    open={this.state.historyDialog.open}
                    onClose={this.handleHistoryClose}
                    exercise={this.props.exercise}
                />
                <ExerciseProgressDialog
                    open={this.state.progressDialog.open}
                    onClose={this.handleProgressClose}
                    exercise={this.props.exercise}
                />
            </div>
        )
    }
}

export default ExerciseForm