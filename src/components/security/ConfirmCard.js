import React, { Component } from 'react';

import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { CardText, CardActions } from 'material-ui/Card'
import SecurityCard from './SecurityCard';

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

const initialState = {
    code: undefined,
    confirmed: false,
}

class ConfirmCard extends Component {
    state = initialState;

    handleConfirmClick = () => {
        this.props.onConfirmClick(this.state.code);
        this.setState({ confirmed: true })
    }

    handleCodeChange = (event, value) => {
        this.setState({ code: value })
    }

    render() {
        return(
            <SecurityCard>
                <CardText>
                    <div style={styles.group}>
                        <ActionCheckCircle style={styles.icon}/>
                        <TextField
                            hintText="Confirmation Code"
                            floatingLabelText="Confirmation Code"
                            onChange={this.handleCodeChange}
                        />
                    </div>
                </CardText>
                <CardActions>
                    <div style={styles.center}>
                        <RaisedButton 
                            style={styles.button} 
                            primary={!this.state.confirmed} 
                            label="Confirm Registration" 
                            onClick={this.handleConfirmClick} />
                    </div>
                    <div style={styles.center}>
                        <span style={styles.toggleText}>Ready to log in?</span>
                        <RaisedButton style={styles.button} primary={this.state.confirmed} label="Login" onClick={() => this.props.onChangeModeClick('login')} />
                    </div>
                </CardActions>
            </SecurityCard>
        )
    }
}

export default ConfirmCard