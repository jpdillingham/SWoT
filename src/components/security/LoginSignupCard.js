import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from './SecurityActions'

import FlatButton from 'material-ui/FlatButton'
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { white } from 'material-ui/styles/colors';

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
        backgroundColor: '#00bcd4',
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions>
                    <FlatButton label="Login" onClick={this.handleLoginClick} />
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