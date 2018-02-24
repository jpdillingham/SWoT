import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Snackbar from 'material-ui/Snackbar'

import Homepage from '../Homepage'
import Exercises from '../exercises/Exercises'
import Routines from '../routines/Routines'

import Login from '../security/Login'
import Register from '../security/Register'
import ConfirmRegistration from '../security/ConfirmRegistration'

class App extends Component {
    theme = getMuiTheme({
        palette: {
            primary1Color: "#2196f3",
            primary2Color: "#64b5f6",
            pickerHeaderColor: "#29b6f6"
        }
    })

    render() {
        return (
            <MuiThemeProvider muiTheme={this.theme}>
                <div>
                    <div style={styles.content}>
                        <Switch>
                            <Route exact path="/" component={Homepage}/>
                            <Route path="/exercises" component={Exercises}/>
                            <Route path="/routines" component={Routines}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/confirm/:email?" component={ConfirmRegistration}/>
                        </Switch>
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
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    showSnackbar: (message) => {
        dispatch({ type: 'SNACKBAR_SHOW', snackbar: { visible: true, message: message ? message : '' }} )
    },
    hideSnackbar: () => {
        dispatch({ type: 'SNACKBAR_HIDE' })
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));