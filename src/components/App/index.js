import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Navigation from '../Navigation'
import Homepage from '../Homepage'
import Exercises from '../Exercises'
import Routines from '../Routines'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
import Home from 'material-ui/svg-icons/action/home';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'

class App extends Component {
    theme = getMuiTheme({
        palette: {
            primary1Color: "#2196f3",
            primary2Color: "#0288d1",
            pickerHeaderColor: "#29b6f6"
        }
    })

    render() {
        return (
            <MuiThemeProvider muiTheme={this.theme}>
                <Navigation>
                    <MenuItem containerElement={<Link to="/" />} leftIcon={<Home />} >Home</MenuItem>
                    <MenuItem containerElement={<Link to="/exercises" />} leftIcon={<AddCircleOutline />}>Exercises</MenuItem>
                    <MenuItem containerElement={<Link to="/routines" />} leftIcon={<ContentPaste />}>Routines</MenuItem>
                </Navigation>
                <div>
                    <Switch>
                        <Route exact path="/" component={Homepage}/>
                        <Route path="/exercises" component={Exercises}/>
                        <Route path="/routines" component={Routines}/>
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;