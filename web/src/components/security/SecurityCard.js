
import React, { Component } from 'react';

import { Card, CardMedia } from 'material-ui/Card';
import ActionDone from 'material-ui/svg-icons/action/done';
import { grey300, green500 } from 'material-ui/styles/colors';
import Spinner from '../shared/Spinner';

const styles = {
    card: {
        width: '390px',
        margin: 'auto',
        marginTop: '-63px',
    },
    media: {
        height: '200px',
        backgroundColor: '#2196f3',
    },
    iconGroup: {
        position: 'relative',
    },
    iconForeground: {
        position: 'relative',
        width: '128px',
        height: '128px',
        top: '20px',
        left: '131px',
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
    container: {
        position: 'relative',
    },
    done: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute',
        color: green500,
        zIndex: 1000,
    },
    doneIcon:{
        width: 48,
        height: 48,
    },
    spinner: {
        top: 0,
        bottom: 0,
        zIndex: 1000,
    },
};

class SecurityCard extends Component {
    render() {
        return(
            <form onSubmit={(event) => event.preventDefault()}>
                <Card 
                    zDepth={4} 
                    style={this.props.api.isExecuting || this.props.api.isSuccess ? { ...styles.card, backgroundColor: grey300 } : styles.card }
                >
                    <CardMedia style={styles.media}>
                        <div style={styles.iconGroup}>
                            <img style={styles.iconForeground} src="/img/weightlifting.png" alt="" />
                            <span style={styles.iconText}><strong>S</strong>imple <strong>Wo</strong>rkout <strong>T</strong>racker</span>
                        </div>
                    </CardMedia>
                    <div style={styles.container}>
                        {this.props.children}
                        {!this.props.api.isSuccess ? '' :
                            <div style={styles.done}>
                                <ActionDone style={{ ...styles.done, ...styles.doneIcon }}/>
                            </div>
                        }
                        {this.props.api.isExecuting ? <Spinner style={styles.spinner}/> : ''}
                    </div>
                </Card>
            </form>
        );
    }
}

export default SecurityCard;