import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, register } from './SecurityActions'

const styles = {
    card: {
        width: '390px',
        margin: 'auto',
        marginTop: '100px'
    },
    media: {
        height: '200px',
        backgroundColor: '#2196f3',
    },
    iconGroup: {
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
}

const initialState = {
    displayMode: 'login'
}

class LoginSignupCard extends Component {
    state = initialState

    handleLoginClick = () => {
        this.props.login({ name: 'a. user' })
        window.location.href="/"
    }

    handleRegisterClick = (username, password) => {
        this.props.register(username, password)
        .then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
    }

    handleConfirmClick = (code) => {

    }

    handleChangeModeClick = (mode) => {
        this.setState({ displayMode: mode })
    }

    render() {
        return (
            null
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        user: state.security.user,
    }
}

const mapDispatchToProps = {
    login,
    register,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupCard);