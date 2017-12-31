import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Navigation from '../Navigation'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
    state = {
        drawerOpen: false,
    }

    theme = getMuiTheme({
        palette: {
            primary1Color: "#2196f3",
            primary2Color: "#0288d1",
            pickerHeaderColor: "#29b6f6"
        }
    })

    toggleDrawer = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={this.theme}>
                <Navigation/>
                <div style={{marginLeft: this.state.drawerOpen ? 0 : 0}}>
                    <h1>Hello World!</h1>
                    <FlatButton label="Primary" primary={true} />
                    <RaisedButton label="Primary" primary={true} />
                </div>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    appBar: {
        position: 'fixed',
        left: 0,
        top: 0,
    }
}

export default App;