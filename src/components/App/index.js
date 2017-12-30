import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'

class App extends Component {
    state = {
        drawerOpen: false,
    }

    toggleDrawer = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }

    signup = () => {
        let poolData = {
            UserPoolId: 'us-east-1_OhnX3yEY5',
            ClientId: '18b132av2gkfgl3m793qcgjsd3'
        }
    
        let userPool = new CognitoUserPool(poolData);
        let attributeList = [];
        let dataEmail = {
            Name: 'test',
            Value: 'test@whatnet.us'
        }
    
        let attributeEmail = new CognitoUserAttribute(dataEmail);

        //attributeList.push(attributeEmail);

        userPool.signUp('cognitotest@whatnet.us', 'Password1@', attributeList, null, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result.user);
            }
        })
    }

    render() {
        return (
            <MuiThemeProvider>
                <AppBar 
                    title="SWoT" 
                    style={styles.appBar}
                    onLeftIconButtonClick={this.toggleDrawer}
                />
                <Drawer 
                    open={this.state.drawerOpen}
                    docked={true}
                    containerStyle={{height: 'calc(100% - 64px)', top: 64}}
                >
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
                <div style={{marginLeft: this.state.drawerOpen ? 255 : 0}}>
                    <h1>Hello World!</h1>
                    <FlatButton label="Primary" primary={true} />
                    <RaisedButton label="Primary" primary={true} />
                    {/*<FlatButton onClick={() => this.signup()}>Sign up!</FlatButton>
                    <RaisedButton label="Primary">Raised!</RaisedButton>*/}
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