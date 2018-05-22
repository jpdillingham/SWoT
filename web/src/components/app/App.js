import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Snackbar from 'material-ui/Snackbar'

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
                        <AppContainer show={this.props.user !== undefined}>
                            <Switch>
                                <Route exact path="/" component={Workouts}/>
                                <Route exact path="/history" component={WorkoutsHistory}/>
                                <Route exact path="/workouts" component={Workouts}/>
                                <Route exact path="/workouts/history" component={WorkoutsHistory}/>
                                <Route path="/workouts/:id" component={Workout}/>
                                <Route exact path="/exercises" component={Exercises}/>
                                <Route exact path="/exercises/history" component={ExercisesHistory}/>
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

const styles = {
    content: {
        marginTop: 73
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