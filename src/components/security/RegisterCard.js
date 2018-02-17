import React, { Component } from 'react';

import ActionFace from 'material-ui/svg-icons/action/face'
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key'
import TextField from 'material-ui/TextField'
import { CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
    group: {
        left: '10px',
        right: '10px',
        textAlign: 'center',
    },
    icon: {
        marginRight: '10px',
    }
}

class RegisterCard extends Component {
    render() {
        return(
            <div>
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
        <div style={styles.group}>
            <CommunicationVpnKey style={styles.icon}/>
            <TextField
                hintText="Repeat Password"
                floatingLabelText="Repeat Password"
            />
        </div>
        </div>
        )
    }
}

export default RegisterCard