import React, { Component } from 'react';

import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key'
import CommunicationEmail from 'material-ui/svg-icons/communication/email'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { CardText, CardActions } from 'material-ui/Card'

import { validateEmail } from '../../util'
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
    info: {
        email: undefined,
        password: undefined,
        password2: undefined,
    },
    validationErrors: {
        email: undefined,
        password: undefined,
        password2: undefined,
    }
}

class RegisterCard extends Component {
    state = initialState;

    handleNavigateClick = (url) => {
        window.location.href = '/' + url
    }

    handleEmailChange = (event, value) => {
        this.setState({ 
            info: { ...this.state.info, email: value },
            validationErrors: { ...this.state.validationErrors, email: undefined }
        });
    }

    handlePasswordChange = (event, value) => {
        this.setState({ 
            info: { ...this.state.info, password: value },
            validationErrors: { ...this.state.validationErrors, password: undefined, password2: undefined }
        });
    }

    handlePassword2Change = (event, value) => {
        this.setState({ 
            info: { ...this.state.info, password2: value },
            validationErrors: { ...this.state.validationErrors, password: undefined, password2: undefined }
        });
    }

    handleRegisterClick = () => {
        this.setState({ validationErrors: this.validateState() }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== undefined) === undefined) {
                this.props.onRegisterClick(this.state.info.email, this.state.info.password);
            }
        })
    }

    validateState = () => {
        let validationErrors = this.state.validationErrors;

        if (!validateEmail(this.state.info.email)) {
            validationErrors = {
                ...validationErrors,
                email: 'Invalid email.'
            }
        }

        if (this.state.info.password === undefined || this.state.info.password === '') {
            validationErrors = { 
                ...validationErrors, 
                password: 'The password can\'t be blank.' 
            }
        }
        else if (this.state.info.password.length < 6) {
            validationErrors = { 
                ...validationErrors, 
                password: 'The password must be at least 6 characters.',
            }
        }
        else if (this.state.info.password !== this.state.info.password2) {
            let text = 'The supplied passwords don\'t match.';

            validationErrors = { 
                ...validationErrors, 
                password: text,
                password2: text,
            }
        }

        return validationErrors;
    }

    render() {
        return(
            <SecurityCard>
                <CardText>
                <div style={styles.group}>
                    <CommunicationEmail style={styles.icon}/>
                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        defaultValue={this.state.info.email}
                        errorText={this.state.validationErrors.email}
                        onChange={this.handleEmailChange}
                    />
                </div>
                <div style={styles.group}>
                    <CommunicationVpnKey style={styles.icon}/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        defaultValue={this.state.info.password}
                        errorText={this.state.validationErrors.password}
                        onChange={this.handlePasswordChange}
                    />
                </div>
                <div style={styles.group}>
                    <CommunicationVpnKey style={styles.icon}/>
                    <TextField
                        hintText="Repeat Password"
                        floatingLabelText="Repeat Password"
                        defaultValue={this.state.info.password2}
                        errorText={this.state.validationErrors.password2}
                        onChange={this.handlePassword2Change}
                    />
                </div>
                </CardText>
                <CardActions>
                    <div style={styles.center}>
                        <RaisedButton 
                            style={styles.button} 
                            primary={true} 
                            label="Register" 
                            onClick={this.handleRegisterClick} />
                    </div>
                    <div style={styles.center}>
                        <span style={styles.toggleText}>Have a confirmation code?</span>
                        <RaisedButton style={styles.button} label="Confirm Registration" onClick={() => this.handleNavigateClick('confirm')} />
                    </div>
                    <div style={styles.center}>
                        <span style={styles.toggleText}>Already registered?</span>
                        <RaisedButton style={styles.button} label="Login" onClick={() => this.handleNavigateClick('login')} />
                    </div>
                </CardActions>
            </SecurityCard>
        )
    }
}

export default RegisterCard