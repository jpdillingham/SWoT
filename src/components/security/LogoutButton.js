import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from './SecurityActions'
import { showSnackbar } from '../app/AppActions'

import IconButton from 'material-ui/IconButton'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import { white } from 'material-ui/styles/colors';

const styles = {
    button: {
        margin: 'auto'
    },
    text: {
        margin: 'auto',
        color: '#FFF'
    },
    container: {
        display: 'inherit'
    }
}

const initialState = {
}

class LogoutButton extends Component {
    state = initialState

    handleLogoutClick = () => {
        this.props.logout()
        .then(() => {
            this.props.showSnackbar("Successfully logged out!");
        });
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.text}>{this.props.user ? this.props.user : ''}</div>

                <IconButton style={styles.button}>
                    <ActionExitToApp color={white} onClick={this.handleLogoutClick} />
                </IconButton>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        user: state.security.user,
    }
}

const mapDispatchToProps = ({
    logout,
    showSnackbar
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);