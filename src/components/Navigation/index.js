import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom';

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
                />
                <Drawer 
                    open={this.state.drawerOpen}
                    docked={false}
                    onRequestChange={this.toggleDrawer}
                >
                    <AppBar title="SWoT" showMenuIconButton={false}/>
                    {this.props.children}
                </Drawer>
            </div>
        );
    }
}

const styles = {
    appBar: {
        position: 'relative',
        left: 0,
        top: 0,
    }
}

export default Navigation;