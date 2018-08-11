import React, { Component } from 'react';
import { connect } from 'react-redux';

import { register } from './SecurityActions';
import { showSnackbar } from '../app/AppActions';

import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { CardText, CardActions } from 'material-ui/Card';

import { validateEmail } from '../../util';
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
        width: '200px',
    },
    toggleText: {
        marginTop: '30pt',
        fontSize: '9pt',
        textAlign: 'center',
        display: 'block',
    },
};

const initialState = {
    info: {
        email: '',
        password: '',
        password2: '',
    },
    validationErrors: {
        email: undefined,
        password: undefined,
        password2: undefined,
    },
    registered: false,
    api: {
        isExecuting: false,
        isErrored: false,
        isSuccess: false,
    },
};

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.emailInput = React.createRef();
        this.password1Input = React.createRef();
        this.password2Input = React.createRef();
    }

    componentDidMount = () => {
        this.emailInput.current.focus();
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleNavigateClick = (url) => {
        this.navigate(url);
    }

    handleEmailChange = (event, value) => {
        this.setState({ 
            info: { ...this.state.info, email: value },
            validationErrors: { ...this.state.validationErrors, email: undefined },
        });
    }

    handlePasswordChange = (event, value) => {
        this.setState({ 
            info: { ...this.state.info, password: value },
            validationErrors: { ...this.state.validationErrors, password: undefined, password2: undefined },
        });
    }

    handlePassword2Change = (event, value) => {
        this.setState({ 
            info: { ...this.state.info, password2: value },
            validationErrors: { ...this.state.validationErrors, password: undefined, password2: undefined },
        });
    }

    handleRegisterClick = () => {
        this.setState({ validationErrors: this.validateState() }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== undefined) === undefined) {
                this.setState({ api: { isExecuting: true }}, () => {
                    this.props.register(this.state.info.email, this.state.info.password)
                    .then((response) => {
                        this.setState({ registered: true }, () => {
                            this.setState({ api: { isExecuting: false, isErrored: false, isSuccess: true }});
                            this.props.showSnackbar("Registration successful!");
                            setTimeout(() => this.navigate('/confirm?code=' + btoa(this.state.info.email)), 1000);
                        });
                    }, (error) => {
                        this.setState({ api: { isExecuting: false, isErrored: true, isSuccess: false }});
                        this.props.showSnackbar(error.message);
                        this.emailInput.current.focus();
                    });
                });
            }
        });
    }

    validateState = () => {
        let validationErrors = this.state.validationErrors;
        let focus = undefined;

        if (!validateEmail(this.state.info.email)) {
            validationErrors = {
                ...validationErrors,
                email: 'Invalid email.',
            };

            focus = this.emailInput.current;
        }

        if (this.state.info.password === undefined || this.state.info.password === '') {
            validationErrors = { 
                ...validationErrors, 
                password: 'The password can\'t be blank.', 
            };

            focus = !focus ? this.password1Input.current : focus;
        }
        else if (this.state.info.password.length < 6) {
            validationErrors = { 
                ...validationErrors, 
                password: 'The password must be at least 6 characters.',
            };

            focus = !focus ? this.password1Input.current : focus;
        }
        else if (this.state.info.password !== this.state.info.password2) {
            let text = 'The supplied passwords don\'t match.';

            validationErrors = { 
                ...validationErrors, 
                password: text,
                password2: text,
            };

            focus = !focus ? this.password2Input.current : focus;
        }

        if (focus) focus.focus();

        return validationErrors;
    }

    render() {
        let disabled = this.state.api.isExecuting || this.state.api.isSuccess;

        return(
            <SecurityCard api={this.state.api}>
                <CardText>
                    <div style={styles.group}>
                        <CommunicationEmail style={styles.icon}/>
                        <TextField
                            hintText="Email"
                            floatingLabelText="Email"
                            value={this.state.info.email}
                            errorText={this.state.validationErrors.email}
                            onChange={this.handleEmailChange}
                            disabled={disabled}
                            ref={this.emailInput}
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
                            disabled={disabled}
                            ref={this.password1Input}
                        />
                    </div>
                    <div style={styles.group}>
                        <CommunicationVpnKey style={styles.icon}/>
                        <TextField
                            hintText="Repeat Password"
                            floatingLabelText="Repeat Password"
                            value={this.state.info.password2}
                            errorText={this.state.validationErrors.password2}
                            onChange={this.handlePassword2Change}
                            type="password"
                            disabled={disabled}
                            ref={this.password2Input}
                        />
                    </div>
                </CardText>
                <CardActions>
                    <div style={styles.center}>
                        <RaisedButton 
                            style={styles.button} 
                            primary={!this.state.registered} 
                            label="Register" 
                            onClick={this.handleRegisterClick} 
                            disabled={disabled}
                            type='submit'
                        />
                    </div>
                    <div style={styles.center}>
                        <span style={styles.toggleText}>Have a confirmation code?</span>
                        <RaisedButton 
                            style={styles.button} 
                            primary={this.state.registered} 
                            label="Confirm Registration" 
                            onClick={() => this.handleNavigateClick('confirm')} 
                            disabled={disabled}
                        />
                    </div>
                    <div style={styles.center}>
                        <span style={styles.toggleText}>Already registered?</span>
                        <RaisedButton 
                            style={styles.button} 
                            label="Login" 
                            onClick={() => this.handleNavigateClick('login')} 
                            disabled={disabled}
                        />
                    </div>
                </CardActions>
            </SecurityCard>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
    };
};

const mapDispatchToProps = {
    register,
    showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);