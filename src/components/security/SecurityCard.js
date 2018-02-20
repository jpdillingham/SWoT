
import React, { Component } from 'react';

import { Card, CardMedia } from 'material-ui/Card'

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

class SecurityCard extends Component {
    render() {
        return(
            <Card zDepth={4} style={styles.card}>
                <CardMedia style={styles.media}>
                    <div style={styles.iconGroup}>
                        <img style={styles.iconForeground} src="/img/weightlifting.png" alt="" />
                        <span style={styles.iconText}><strong>S</strong>imple <strong>Wo</strong>rkout <strong>T</strong>racker</span>
                    </div>
                </CardMedia>
                {this.props.children}
            </Card>
        )
    }
}

export default SecurityCard