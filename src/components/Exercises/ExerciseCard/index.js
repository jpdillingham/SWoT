import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import AppBar from 'material-ui/AppBar/AppBar';
import {Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

class ExerciseCard extends Component {
    render() {
        return (
            <Card zDepth={2} style={styles.card}>
                <CardTitle 
                    title={this.props.title} 
                    subtitle={
                        <span 
                            style={styles.link} 
                            onClick={() => window.location.href=this.props.subtitle}
                        >
                            {this.props.subtitle}
                        </span>
                    }
                >
                </CardTitle>
                <CardText>
                    {this.props.children}
                </CardText>
                <CardActions>
                    <FloatingActionButton zDepth={2} default={true} mini={true} style={{ position: 'absolute', marginTop: -10 }}>
                        <ContentCreate />
                    </FloatingActionButton>
                    <FloatingActionButton zDepth={2} secondary={true} mini={true} style={{ position: 'absolute', left: 55, marginTop: -10 }}>
                        <ContentRemove />
                    </FloatingActionButton>
                </CardActions>
            </Card>
        )
    }
}

export default ExerciseCard

const styles = {
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    card: {
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: -30
    },
    link: {
        cursor: 'pointer',
    }
}