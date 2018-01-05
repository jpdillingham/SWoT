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
import ExerciseDeleteDialog from '../ExerciseDeleteDialog'

import { EXERCISE_TYPES } from '../../../constants'

class ExerciseCard extends Component {
    state = {
        deleteDialogOpen: false
    }

    handleDeleteDialogClose = (confirmDelete) => {
        if (confirmDelete) {
            this.props.deleteExercise(this.props.exercise.id);
            this.props.showSnackbar('Deleted exercise \'' + this.props.exercise.name + '\'')
        }

        this.setState({ deleteDialogOpen: false })
    }

    handleDeletedialogOpen = () => {
        this.setState({ deleteDialogOpen: true })
    }

    render() {
        let truncatedUrl = this.props.exercise.url.split('/');
        truncatedUrl = '../' + truncatedUrl[truncatedUrl.length - 1];

        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) == -1) { 
            exerciseImage = 'unknown'
        }

        return (
            <Card zDepth={2} style={styles.card}>
                <CardHeader
                    title={this.props.exercise.name}
                    subtitle={
                        <span 
                            style={styles.link}
                            onClick={() => window.open(this.props.exercise.url)}
                        >
                            {truncatedUrl}
                            <IconButton style={styles.exitIconButton} iconStyle={styles.exitIcon}>
                                <ActionExitToApp/>
                            </IconButton>
                        </span>
                    }
                    avatar={<Avatar backgroundColor="#64b5f6" src={'img/' + exerciseImage + '.png'}></Avatar>}
                    style={{marginBottom: -30}}
                />
                <CardText>
                    <List>
                        {this.props.exercise.metrics ? this.props.exercise.metrics.map(m =>                     
                            <ListItem
                                leftIcon={<ActionAssignment/>}
                                primaryText={m.name}
                                secondaryText={m.uom ? m.uom : ''}
                            />
                        ) : ''}
                    </List>
                </CardText>
                <CardActions>
                    <FlatButton>Edit</FlatButton>
                    <FlatButton onClick={() => this.handleDeletedialogOpen()}>Delete</FlatButton>
                </CardActions>
                <ExerciseDeleteDialog 
                    open={this.state.deleteDialogOpen} 
                    handleClose={this.handleDeleteDialogClose}
                    exercise={this.props.exercise}
                />
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