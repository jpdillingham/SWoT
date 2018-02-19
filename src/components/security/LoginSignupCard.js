import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, register } from './SecurityActions'

import { Card, CardMedia } from 'material-ui/Card'

import LoginCard from './LoginCard'
import RegisterCard from './RegisterCard';

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
    loginMode: true
}

class LoginSignupCard extends Component {
    state = initialState

    handleLoginClick = () => {
        this.props.login({ name: 'a. user' })
    }

    handleRegisterClick = (username, email, password) => {
        this.props.register(username, email, password)
        .then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
    }

    handleToggleClick = () => {
        this.setState({ loginMode: !this.state.loginMode })
    }

    render() {
        return (
            <Card zDepth={4} style={styles.card}>
                <CardMedia style={styles.media}>
                    <div style={styles.iconGroup}>
                        <img style={styles.iconForeground} src="/img/weightlifting.png" alt="" />
                        <span style={styles.iconText}><strong>S</strong>imple <strong>Wo</strong>rkout <strong>T</strong>racker</span>
                    </div>
                </CardMedia>
                {this.state.loginMode ? 
                    <LoginCard 
                        onLoginClick={this.handleLoginClick} 
                        onToggleClick={this.handleToggleClick}
                    /> :
                    <RegisterCard
                        onRegisterClick={this.handleRegisterClick} 
                        onToggleClick={this.handleToggleClick}
                    />
                }
            </Card>
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