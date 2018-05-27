import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionDescription from 'material-ui/svg-icons/action/description'
import Divider from 'material-ui/Divider/Divider';
import { getMuiTheme } from 'material-ui/styles';
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar'
import Subheader from 'material-ui/Subheader/Subheader';

import AppContainer from './AppContainer'

import Workouts from '../workouts/Workouts'
import Workout from '../workouts/Workout'
import WorkoutsHistory from '../workouts/history/WorkoutsHistory'
import Exercises from '../exercises/Exercises'
import ExercisesHistory from '../exercises/history/ExercisesHistory'
import Routines from '../routines/Routines'

import Login from '../security/Login'
import Register from '../security/Register'
import ConfirmRegistration from '../security/ConfirmRegistration'

import { ensureSession } from '../security/SecurityActions'
import { hideSnackbar } from './AppActions'

const styles = {
    content: {
        marginTop: 73
    }
}

class App extends Component {
    theme = getMuiTheme({
        palette: {
            primary1Color: "#2196f3",
            primary2Color: "#64b5f6",
            pickerHeaderColor: "#29b6f6"
        }
    })

    navigate = (url) => {
        this.props.history.push(url);
    }

    componentWillMount = () => {
        this.props.ensureSession()
            .then((result) => { }, (err) => {
                this.navigate('/login');
            })
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.session !== undefined) {
            if (nextProps.session === undefined) {
                this.navigate('/login');
            }
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={this.theme}>
                <div>
                    <div style={styles.content}>
                        <AppContainer 
                            show={this.props.user !== undefined}
                            links={
                                <div>
                                    <Subheader>Workouts</Subheader>
                                    <MenuItem containerElement={<Link to="/" />} leftIcon={<ActionAssignmentTurnedIn />}>List</MenuItem>
                                    <MenuItem containerElement={<Link to="/" />} leftIcon={<ActionAssignmentTurnedIn />}>Calendar</MenuItem>
                                    <Divider/>
                                    <Subheader>Reports</Subheader>
                                    <MenuItem containerElement={<Link to="/workouts/history" />} leftIcon={<ActionAssignmentTurnedIn />}>Workouts</MenuItem>
                                    <MenuItem containerElement={<Link to="/exercises/history" />} leftIcon={<ActionAssignmentTurnedIn />}>Exercises</MenuItem>
                                    <Divider/>
                                    <Subheader>Configuration</Subheader>
                                    <MenuItem containerElement={<Link to="/routines" />} leftIcon={<ActionAssignment />}>Routines</MenuItem>
                                    <MenuItem containerElement={<Link to="/exercises" />} leftIcon={<ActionDescription />}>Exercises</MenuItem>
                                </div>
                            }
                        >
                            <Switch>
                                <Route exact path="/" component={Workouts}/>
                                <Route exact path="/history" component={WorkoutsHistory}/>
                                <Route exact path="/workouts" component={Workouts}/>
                                <Route exact path="/workouts/history" component={WorkoutsHistory}/>
                                <Route path="/workouts/:id" component={Workout}/>
                                <Route exact path="/exercises" component={Exercises}/>
                                <Route path="/exercises/history/:id" component={ExercisesHistory}/>
                                <Route path="/routines" component={Routines}/>
                                <Route path="/login" component={Login}/>
                                <Route path="/register" component={Register}/>
                                <Route path="/confirm/:code?" component={ConfirmRegistration}/>
                            </Switch>
                        </AppContainer>
                    </div>
                    <Snackbar
                        open={this.props.snackbar.visible}
                        message={this.props.snackbar.message}
                        onRequestClose={this.props.hideSnackbar}
                        autoHideDuration={2500}
                    />
                </div>
            </MuiThemeProvider>
        );
    }    
}

const mapStateToProps = (state, ownProps) => {
    return { 
        snackbar: state.app.snackbar,
        user: state.security.user,
        session: state.security.session,
    }
}

const mapDispatchToProps = {
    hideSnackbar,
    ensureSession
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));