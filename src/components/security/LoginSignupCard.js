import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from './SecurityActions'

import FlatButton from 'material-ui/FlatButton'

const styles = {
}

const initialState = {
}

class LoginSignupCard extends Component {
    state = initialState

    handleLoginClick = () => {
        this.props.login({ name: 'a. user'})
    }

    render() {
        return (
            <FlatButton label="Login" onClick={this.handleLoginClick} />
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