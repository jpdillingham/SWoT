import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import LogoutButton from '../security/LogoutButton';

import { withRouter } from 'react-router-dom'

import { Link, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Homepage from '../Homepage'
import Exercises from '../exercises/Exercises'
import Routines from '../routines/Routines'

import MenuItem from 'material-ui/MenuItem'
import Home from 'material-ui/svg-icons/action/home';
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import ActionAccessibility from 'material-ui/svg-icons/action/accessibility'
import Snackbar from 'material-ui/Snackbar'

class Navigation extends Component {
    state = {
        drawerOpen: false,
    }

    toggleDrawer = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }

    render() {
        return (
            <div>
                <AppBar 
                    title="SWoT" 
                    style={styles.appBar}
                    onLeftIconButtonClick={this.toggleDrawer}
                >
                    <LogoutButton/>
                </AppBar>
                <Drawer 
                    open={this.state.drawerOpen}
                    docked={false}
                    onRequestChange={this.toggleDrawer}
                >
                    <AppBar title="SWoT" showMenuIconButton={false}/>
                    <MenuItem containerElement={<Link to="/" />} leftIcon={<Home />} >Home</MenuItem>
                    <MenuItem containerElement={<Link to="/exercises" />} leftIcon={<ActionAccessibility />}>Exercises</MenuItem>
                    <MenuItem containerElement={<Link to="/routines" />} leftIcon={<ContentPaste />}>Routines</MenuItem>
                </Drawer>
                    {this.props.children}
            </div>
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

export default Navigation;