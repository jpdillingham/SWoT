import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Navigation from '../Navigation'
import Home from '../Home'
import Exercises from '../Exercises'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
                    <Link to="/">Home</Link>
                    <Link to="/exercises">Exercises</Link>
                </Navigation>
                <div>
                    <h1>Hello World!</h1>
                    <FlatButton label="Primary" primary={true} />
                    <RaisedButton label="Primary" primary={true} />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/exercises" component={Exercises}/>
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;