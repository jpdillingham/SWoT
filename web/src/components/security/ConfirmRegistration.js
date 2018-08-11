import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { confirm } from './SecurityActions';
import { showSnackbar, setVariable } from '../app/AppActions';

import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { CardText, CardActions } from 'material-ui/Card';
import SecurityCard from './SecurityCard';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

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
        code: '',
    },
    validationErrors: {
        email: undefined,
        code: undefined,
    },
    confirmed: false,
    api: {
        isExecuting: false,
        isErrored: false,
        isSuccess: false,
    },
};

class ConfirmRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        let params = queryString.parse(this.props.location.search);

        if (params !== undefined && params.code !== undefined) {
            try {
                let data = atob(params.code).split(';');
                
                if (data.length < 1) throw new Error('invalid code.');

                if (!validateEmail(data[0])) throw new Error('invalid email.');
                this.state.info.email = data[0];

                if (data.length === 2) {
                    let regex = new RegExp('^[0-9]{6}');
                    if (!regex.test(data[1])) throw new Error('invalid code (' + data[1] + ')');
                    this.state.info.code = data[1];
                }
            } catch(err) { 
                this.navigate('/confirm');
            }
        }

        this.emailInput = React.createRef();
        this.codeInput = React.createRef();
    }

    componentDidMount = () => {
        if (!this.state.info.email) {
            this.emailInput.current.focus();
        }
        else {
            this.codeInput.current.focus();
        }
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleNavigateClick = (url) => {
        this.navigate(url);
    }

    handleConfirmClick = () => {
        this.setState({ validationErrors: this.validateState() }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== undefined) === undefined) {
                this.setState({ api: { isExecuting: true }}, () => {
                    this.props.confirm(this.state.info.email, this.state.info.code)
                    .then((response) => {
                        this.setState({ confirmed: true }, () => {
                            this.setState({ api: { isExecuting: false, isErrored: false, isSuccess: true }});
                            this.props.showSnackbar("Account confirmed!");
                            this.props.setVariable('loginEmail', this.state.info.email);
                            setTimeout(() => this.navigate('/login'), 1000);
                        });
                    }, (error) => {
                        this.setState({ 
                            api: { isExecuting: false, isErrored: true, isSuccess: false },
                            info: { ...this.state.info, code: '' },
                        });
                        this.props.showSnackbar(error.message);
                        this.codeInput.current.focus();
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

        if (this.state.info.code === undefined || this.state.info.code.length !== 6) {
            validationErrors = { 
                ...validationErrors, 
                code: 'The code must be 6 characters.',
            };

            focus = !focus ? this.codeInput.current : focus;
        }
        else if (!/^\d+$/.test(this.state.info.code)) {
            validationErrors = {
                ...validationErrors,
                code: 'The code must only contain numbers.',
            };

            focus = !focus ? this.codeInput.current : focus;
        }

        if (focus) focus.focus();

        return validationErrors;
    }

    handleEmailChange = (event, value) => {
        this.setState({ 
            validationErrors: {
                ...this.state.validationErrors, email: undefined,
            },
            info: { 
                ...this.state.info, email: value, 
            }, 
        });
    }

    handleCodeChange = (event, value) => {
        this.setState({ 
            validationErrors: {
                ...this.state.validationErrors, code: undefined,
            },
            info: { 
                ...this.state.info, code: value, 
            },
        });
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
                        <ActionCheckCircle style={styles.icon}/>
                        <TextField
                            hintText="Confirmation Code"
                            floatingLabelText="Confirmation Code"
                            value={this.state.info.code}
                            errorText={this.state.validationErrors.code}
                            onChange={this.handleCodeChange}
                            disabled={disabled}
                            ref={this.codeInput}
                        />
                    </div>
                </CardText>
                <CardActions>
                    <div style={styles.center}>
                        <RaisedButton 
                            style={styles.button} 
                            primary={!this.state.confirmed} 
                            label="Confirm Registration" 
                            onClick={this.handleConfirmClick} 
                            disabled={disabled}
                            type='submit'
                        />
                    </div>
                    <div style={styles.center}>
                        <span style={styles.toggleText}>Ready to log in?</span>
                        <RaisedButton 
                            style={styles.button} 
                            primary={this.state.confirmed} 
                            label="Login" 
                            onClick={() => this.handleNavigateClick('/login')} 
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
    confirm,
    showSnackbar,
    setVariable,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRegistration);