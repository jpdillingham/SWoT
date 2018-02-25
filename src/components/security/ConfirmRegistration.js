import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { confirm } from './SecurityActions'
import { showSnackbar } from '../app/AppActions'

import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { CardText, CardActions } from 'material-ui/Card'
import SecurityCard from './SecurityCard';
import CommunicationEmail from 'material-ui/svg-icons/communication/email'

import { validateEmail } from '../../util'

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
        code: undefined,
    },
    validationErrors: {
        email: undefined,
        code: undefined,
    },
    confirmed: false,
}

class ConfirmRegistration extends Component {
    constructor(props) {
        super(props)

        this.state = initialState;

        let params = queryString.parse(this.props.location.search);

        if (params !== undefined && params.code !== undefined) {
            try {
                let data = atob(params.code).split(';');
                
                if (data.length < 1) throw new Error('invalid code.');

                if (!validateEmail(data[0])) throw new Error('invalid email.');
                this.state.info.email = data[0];

                if (data.length === 2) {
                    let regex = new RegExp('^[0-9]{6}')
                    if (!regex.test(data[1])) throw new Error('invalid code (' + data[1] + ')');
                    this.state.info.code = data[1];
                }
            } catch(err) { 
                this.navigate('confirm')
            }
        }
    }

    navigate = (url) => {
        window.location.href = '/' + url;
    }

    handleNavigateClick = (url) => {
        this.navigate(url)
    }

    handleConfirmClick = () => {
        this.setState({ validationErrors: this.validateState() }, () => {
            if (Object.keys(this.state.validationErrors).find(e => this.state.validationErrors[e] !== undefined) === undefined) {
                this.props.confirm(this.state.info.email, this.state.info.code)
                .then((response) => {
                    this.setState({ confirmed: true }, () => {
                        this.props.showSnackbar("Account confirmed!");
                        setTimeout(() => this.navigate('login'));
                    })
                }, (error) => {
                    console.log(error)
                })
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

        if (this.state.info.code.length !== 6) {
            validationErrors = { 
                ...validationErrors, 
                code: 'The code must be 6 characters.',
            }
        }
        else if (!/^\d+$/.test(this.state.info.code)) {
            validationErrors = {
                ...validationErrors,
                code: 'The code must only contain numbers.',
            }
        }

        return validationErrors;
    }

    handleEmailChange = (event, value) => {
        this.setState({ 
            validationErrors: {
                ...this.state.validationErrors, email: undefined
            },
            info: { 
                ...this.state.info, email: value 
            } 
        })
    }

    handleCodeChange = (event, value) => {
        this.setState({ 
            validationErrors: {
                ...this.state.validationErrors, code: undefined
            },
            info: { 
                ...this.state.info, code: value 
            }
        })
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
                        <ActionCheckCircle style={styles.icon}/>
                        <TextField
                            hintText="Confirmation Code"
                            floatingLabelText="Confirmation Code"
                            defaultValue={this.state.info.code}
                            errorText={this.state.validationErrors.code}
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
                        <RaisedButton style={styles.button} primary={this.state.confirmed} label="Login" onClick={() => this.handleNavigateClick('login')} />
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
    confirm,
    showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRegistration)