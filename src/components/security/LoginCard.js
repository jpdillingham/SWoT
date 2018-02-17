import React, { Component } from 'react';

import ActionFace from 'material-ui/svg-icons/action/face'
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key'
import TextField from 'material-ui/TextField'
import CardText from 'material-ui/Card/CardText';

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
            </div>
        )
    }
}

export default LoginCard