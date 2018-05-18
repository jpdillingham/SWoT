import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key'
import CommunicationEmail from 'material-ui/svg-icons/communication/email'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { CardText, CardActions } from 'material-ui/Card'
import SecurityCard from './SecurityCard';

import { authenticate } from './SecurityActions';
import { showSnackbar } from '../app/AppActions';
import { validateEmail } from '../../util';

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
        email: '',
        password: '',
    },
    validationErrors: {
        email: undefined,
        password: undefined,
    }
}

class Login extends Component {
    state = initialState;

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleNavigateClick = (url) => {
        this.navigate(url);
    }

    handleLoginClick = () => {
        this.setState({ validationErrors: this.validateState() }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== undefined) === undefined) {
                this.props.authenticate(this.state.info.email, this.state.info.password)
                .then((response) => {
                    this.props.showSnackbar('Successfully logged in!');
                    setTimeout(() => this.navigate('/'), 0);
                }, (error) => {
                    this.setState({ info: { ...this.state.info, password: '' }}, () => {
                        this.props.showSnackbar(error.message);
                    })
                })
            }
        })
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
            validationErrors: { ...this.state.validationErrors, password: undefined }
        });
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
                            value={this.state.info.email}
                            errorText={this.state.validationErrors.email}
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div style={styles.group}>
                        <CommunicationVpnKey style={styles.icon}/>
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            value={this.state.info.password}
                            errorText={this.state.validationErrors.password}
                            onChange={this.handlePasswordChange}
                            type="password"
                        />
                    </div>
                </CardText>
                <CardActions>
                    <div style={styles.center}>
                        <RaisedButton style={styles.button} primary={true} label="Login" onClick={this.handleLoginClick} />
                    </div>
                    <div style={styles.center}>
                        <span style={styles.toggleText}>No account?</span>
                        <RaisedButton style={styles.button} label="Register" onClick={() => this.handleNavigateClick('register')} />
                    </div>
                </CardActions>
            </SecurityCard>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
    }
}

const mapDispatchToProps = {
    authenticate,
    showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)