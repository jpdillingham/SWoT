import React, { Component } from 'react';

import ActionFace from 'material-ui/svg-icons/action/face'
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { CardText, CardActions } from 'material-ui/Card'

const styles = {
    group: {
        left: '10px',
        right: '10px',
        textAlign: 'center',
    },
    icon: {
        marginRight: '10px',
    },
    center: {
        width: '390px',
        position: 'relative',
        left: '-8px',
    },
    button: {
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '95px',
        width: '200px'
    },
    toggleText: {
        marginTop: '30pt',
        fontSize: '9pt',
        textAlign: 'center',
        display: 'block'
    }
}

class LoginCard extends Component {
    render() {
        return(
            <div>
                <CardText>
                    <div style={styles.group}>
                        <ActionFace style={styles.icon}/>
                        <TextField
                            hintText="Username"
                            floatingLabelText="Username"
                        />
                    </div>
                    <div style={styles.group}>
                        <CommunicationVpnKey style={styles.icon}/>
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                        />
                    </div>
                </CardText>
                <CardActions>
                    <div style={styles.center}>
                        <RaisedButton style={styles.button} primary={true} label="Login" onClick={this.props.onLoginClick} />
                    </div>
                    <div style={styles.center}>
                        <span style={styles.toggleText}>No account?</span>
                        <RaisedButton style={styles.button} label="Register" onClick={this.props.onToggleClick} />
                    </div>
                </CardActions>
            </div>
        )
    }
}

export default LoginCard