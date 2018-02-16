import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from './SecurityActions'

import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardText, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key'
import ActionFace from 'material-ui/svg-icons/action/face'

const styles = {
    card: {
        width: '390px',
        margin: 'auto',
        marginTop: '100px'
    },
    overlay: {
        maginTop: '-100px'
    },
    media: {
        height: '200px',
        backgroundColor: '#2196f3',
    },
    iconGroup: {
        position: 'relative'
    },
    iconBackground: {
        position: 'relative'
    },
    iconForeground: {
        position: 'relative',
        width: '128px',
        height: '128px',
        top: '20px',
        left: '131px'
    },
    iconText: {
        position: 'absolute',
        left: 0,
        color: 'white',
        bottom: '-60px',
        width: '390px',
        fontSize: '24pt',
        textAlign: 'center',
        textShadow: '2px 2px 10px #000000',
    },
    loginButton: {
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '95px',
        width: '200px'
    },
    registerButton: {
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '95px',
        width: '200px'
    },
    buttonText: {
        marginTop: '30pt',
        fontSize: '9pt',
        textAlign: 'center',
        display: 'block'
    }
}
const initialState = {
    loginMode: true
}

class LoginSignupCard extends Component {
    state = initialState

    handleLoginClick = () => {
        this.props.login({ name: 'a. user'})
    }

    toggleMode = () => {
        this.setState({ loginMode: !this.state.loginMode })
    }

    render() {
        return (
            <Card zDepth={4} style={styles.card}>
                <CardMedia
                    style={styles.media}
                >
                    <div style={styles.iconGroup}>
                        {/*<img style={styles.iconBackground} src="/img/geometric.jpg" alt="" /> */}
                        <img style={styles.iconForeground} src="/img/weightlifting.png" alt="" />
                        <span style={styles.iconText}><strong>S</strong>imple <strong>Wo</strong>rkout <strong>T</strong>racker</span>
                    </div>
                </CardMedia>
                <CardText>
                    {this.state.loginMode ? 
                    <div>
                    <div style={{ left: '10px', right: '10px', textAlign: 'center'}}>
                        <ActionFace style={{ marginRight: '10px' }}/>
                        <TextField
                            hintText="Username"
                            floatingLabelText="Username"
                        />
                    </div>
                    <div style={{ left: '10px', right: '10px', textAlign: 'center'}}>
                        <CommunicationVpnKey style={{ marginRight: '10px' }}/>
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                        />
                    </div></div> :
                                        <div><div style={{ left: '10px', right: '10px', textAlign: 'center'}}>
                                        <ActionFace style={{ marginRight: '10px' }}/>
                                        <TextField
                                            hintText="Username"
                                            floatingLabelText="Username"
                                        />
                                    </div>
                                    <div style={{ left: '10px', right: '10px', textAlign: 'center'}}>
                                        <CommunicationVpnKey style={{ marginRight: '10px' }}/>
                                        <TextField
                                            hintText="Password"
                                            floatingLabelText="Password"
                                        />
                                    </div>
                                    <div style={{ left: '10px', right: '10px', textAlign: 'center'}}>
                                        <CommunicationVpnKey style={{ marginRight: '10px' }}/>
                                        <TextField
                                            hintText="Repeat Password"
                                            floatingLabelText="Repeat Password"
                                        />
                                    </div>
                                    </div>
                    }
                </CardText>
                <CardActions>
                    <div style={{ width: '390px', position: 'relative', left: '-8px'}}>
                        <RaisedButton style={styles.loginButton} primary={true} label="Login" onClick={this.handleLoginClick} />
                    </div>
                    <div style={{ width: '390px', position: 'relative', left: '-8px'}}>
                        <span style={styles.buttonText}>No account?</span>
                        <RaisedButton style={styles.registerButton} label="Register" onClick={this.toggleMode} />
                    </div>
                </CardActions>
            </Card>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        user: state.security.user,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: (user) => {
        dispatch(login(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupCard);