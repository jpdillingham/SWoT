import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import AppBar from 'material-ui/AppBar/AppBar';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import Avatar from 'material-ui/Avatar'

import Metric from './Metric'

class ExerciseCard extends Component {
    render() {
        let truncatedUrl = this.props.subtitle.split('/');
        truncatedUrl = '../' + truncatedUrl[truncatedUrl.length - 1]

        return (
            <Card zDepth={2} style={styles.card}>
                <CardHeader
                    title={this.props.title}
                    subtitle={
                        <span 
                            style={styles.link}
                            onClick={() => window.open(this.props.subtitle)}
                        >
                            {truncatedUrl}
                            <IconButton style={styles.exitIconButton} iconStyle={styles.exitIcon}>
                                <ActionExitToApp/>
                            </IconButton>
                        </span>
                    }
                    avatar={<Avatar backgroundColor="#64b5f6" src={"img/unknown.png"}></Avatar>}
                    style={{marginBottom: -30}}
                />
                <CardText>
                    <List>
                        {this.props.metrics.map(m =>                     
                            <ListItem
                                leftIcon={<ActionAssignment/>}
                                primaryText={m.name}
                                secondaryText={m.uom ? m.uom : ''}
                            />
                        )}
                    </List>
                </CardText>
                <CardActions>
                    <FlatButton>Edit</FlatButton>
                    <FlatButton>Delete</FlatButton>
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
        width: 400,
    },
    link: {
        cursor: 'pointer',
    },
    metric: {
        marginLeft: -8
    },
    exitIconButton: {
        border: 0,
        width: 16,
        height: 16,
    },
    exitIcon: {
        width: 16,
        height: 16,
        marginTop: -10,
        marginLeft: -5,
        marginBottom: -3,
        color: '#808080'
    }
}