import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { List, ListItem } from 'material-ui/List';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import { ToggleCheckBoxOutlineBlank, ToggleCheckBox, ActionHelp, ActionHighlightOff } from 'material-ui/svg-icons';
import { black, green500, yellow500, red500, grey500 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Spinner from '../shared/Spinner';

import { fetchExercises } from '../exercises/ExercisesActions';
import { fetchRoutines } from '../routines/RoutinesActions';
import { fetchWorkouts } from '../workouts/WorkoutsActions';

const styles = {
    card: {
        width: '390px',
        margin: 'auto',
    },
    cardHeader: {
        backgroundColor: yellow500,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    disabled: {
        color: grey500
    }
}

const initialState = {
    api: {
        isExecuting: false,
        isErrored: false,
    },
}

class HelpChecklist extends Component {
    state = initialState; 

    componentWillMount() {
        this.setState({ api: { ...this.state.api, isExecuting: true }}, () => {
            Promise.all([
                this.props.fetchExercises(),
                this.props.fetchRoutines(),
                this.props.fetchWorkouts(),
            ])
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }})
            }, error => {
                this.props.showSnackbar('Error fetching configuration: ' + error);
                this.setState({ api: { isExecuting: false, isErrored: true }})
            })
        })
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    render() {
        let noExercises = !this.props.exercises.length;
        let noRoutines = !this.props.routines.length;
        let noWorkouts = !this.props.workouts.length;
        
        return (
            this.state.api.isExecuting ? <Spinner size={48}/> : 
                this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <Card zDepth={2} style={styles.card}>
                        <CardHeader                        
                            titleStyle={styles.cardTitle}
                            style={styles.cardHeader}
                            title={'Configuration Checklist'}
                            avatar={<Avatar backgroundColor={yellow500} color={black} size={36} icon={<ActionHelp/>}></Avatar>}
                        >
                        </CardHeader>
                        <CardText>
                            <List>
                                <ListItem
                                    leftIcon={!noExercises ? <ToggleCheckBox color={green500}/> : <ToggleCheckBoxOutlineBlank color={black}/>}
                                    insetChildren={true}
                                    primaryText="Add Exercises"
                                    onClick={() => this.navigate('/exercises')}
                                />
                                <ListItem
                                    leftIcon={!noRoutines ? <ToggleCheckBox color={green500}/> : <ToggleCheckBoxOutlineBlank color={noExercises ? grey500 : black}/>}
                                    insetChildren={true}
                                    primaryText="Add Routines"
                                    onClick={() => this.navigate('/routines')}
                                    disabled={noExercises}
                                    style={noExercises ? styles.disabled : undefined}
                                />
                                <ListItem
                                    leftIcon={!noWorkouts ? <ToggleCheckBox color={green500}/> : <ToggleCheckBoxOutlineBlank color={noRoutines ? grey500 : black}/>}
                                    insetChildren={true}
                                    primaryText="Schedule Workouts"
                                    onClick={() => this.navigate('/workouts')}
                                    disabled={noRoutines}
                                    style={noRoutines ? styles.disabled : undefined}
                                />
                                <ListItem
                                    leftIcon={!noWorkoutsHistory ? <ToggleCheckBox color={green500}/> : <ToggleCheckBoxOutlineBlank color={noRoutines ? grey500 : black}/>}
                                    insetChildren={true}
                                    primaryText="Complete a Workout"
                                    onClick={() => this.navigate('/workouts')}
                                    disabled={noWorkouts}
                                    style={noWorkouts ? styles.disabled : undefined}
                                />
                            </List>
                        </CardText>
                    </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    exercises: state.exercises,
    routines: state.routines,
    workouts: state.workouts,
})

const mapDispatchToProps = {
    fetchExercises,
    fetchRoutines,
    fetchWorkouts,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HelpChecklist))