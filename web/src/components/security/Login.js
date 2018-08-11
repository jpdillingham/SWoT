import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { CardText, CardActions } from 'material-ui/Card';
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
    },
    validationErrors: {
        email: undefined,
        password: undefined,
    },
    api: {
        isExecuting: false,
        isErrored: false,
    },
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        if (this.props.appVariables && this.props.appVariables.loginEmail) this.state.info.email = this.props.appVariables.loginEmail;

        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    componentDidMount = () => {
        if (!this.state.info.email) {
            this.emailInput.current.focus();
        }
        else {
            this.passwordInput.current.focus();
        }
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleNavigateClick = (url) => {
        this.navigate(url);
    }

    handleLoginClick = () => {
        this.setState({ validationErrors: this.validateState() }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== undefined) === undefined) {
                this.setState({ api: { isExecuting: true }}, () => {
                    this.props.authenticate(this.state.info.email, this.state.info.password)
                    .then((response) => {
                        this.props.showSnackbar('Successfully logged in!');
                        setTimeout(() => this.navigate('/'), 0);
                    }, (error) => {
                        this.setState({ 
                            info: { ...this.state.info, password: '' },
                            api: { isExecuting: false, isErrored: true },
                        });
                        this.props.showSnackbar(error.message);  
                        this.passwordInput.current.focus();  
                    });
                });
            }
        });
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
            validationErrors: { ...this.state.validationErrors, password: undefined },
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

            focus = !focus ? this.passwordInput.current : focus;
        }
        else if (this.state.info.password.length < 6) {
            validationErrors = { 
                ...validationErrors, 
                password: 'The password must be at least 6 characters.',
            };

            focus = !focus ? this.passwordInput.current: focus;
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
                            ref={this.passwordInput}
                        />
                    </div>
                </CardText>
                <CardActions>
                    <div style={styles.center}>
                        <RaisedButton 
                            style={styles.button} 
                            primary={true}
                            label="Login" 
                            onClick={this.handleLoginClick} 
                            disabled={disabled}
                            type='submit'
                        />
                    </div>
                    <div style={styles.center}>
                        <span style={styles.toggleText}>No account?</span>
                        <RaisedButton 
                            style={styles.button} 
                            label="Register" 
                            onClick={() => this.handleNavigateClick('register')} 
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
        appVariables: state.app.variables,
    };
};

const mapDispatchToProps = {
    authenticate,
    showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);