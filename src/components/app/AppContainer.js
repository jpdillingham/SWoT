import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import LogoutButton from '../security/LogoutButton';

import AppLinks from './AppLinks'

class AppContainer extends Component {
    state = {
        drawerOpen: false,
    }

    toggleDrawer = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }

    render() {
        return (
            <div>
                {this.props.show ? 
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
                    <AppLinks/>
                </Drawer>
                </div>
                : ''}
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

export default AppContainer;