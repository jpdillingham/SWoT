import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Avatar from 'material-ui/Avatar';

import ExerciseDialog from '../ExerciseDialog'
import ExerciseDeleteDialog from '../ExerciseDeleteDialog';

import { EXERCISE_TYPES } from '../../../constants';

class ExerciseCard extends Component {
    state = {
        deleteDialog: {
            open: false,
        },
        exerciseDialog: {
            open: false,
            intent: '',
            exercise: {},
        }
    }

    handleDeleteDialogClose = (result) => {
        if (result.deleted) {
            this.props.deleteExercise(this.props.exercise.id);
            this.props.showSnackbar('Deleted exercise \'' + this.props.exercise.name + '\'')
        }

        this.setState({ deleteDialog: { open: false }})
    }

    handleExerciseDialogClose = (result) => {
        if (result.edited) {
            this.props.updateExercise(result.exercise)
            this.props.showSnackbar('Updated exercise \'' + this.props.exercise.name + '\'')
        }

        this.setState(prevState => ({
            exerciseDialog: {
                open: false,
                intent: '',
                exercise: {}
            }
        }))
    }

    handleEditClick = () => {
        this.setState(prevState => ({
            exerciseDialog: {
                open: true,
                intent: 'edit',
                exercise: this.props.exercise
            }
        }))
    }

    handleDeleteClick = () => {
        this.setState({ deleteDialog: { open: true }})
    }

    render() {
        let truncatedUrl = this.props.exercise.url.split('/');
        truncatedUrl = '../' + truncatedUrl[truncatedUrl.length - 1];

        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
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
                    style={{marginBottom: -20}}
                />
                <CardText>
                    <List>
                        <Subheader>Metrics</Subheader>
                        {this.props.exercise.metrics ? this.props.exercise.metrics.map(m =>                     
                            <ListItem
                                key={m.name}
                                leftIcon={<ActionAssignment/>}
                                primaryText={m.name}
                                secondaryText={m.uom ? m.uom : ''}
                            />
                        ) : ''}
                    </List>
                </CardText>
                <CardActions>
                    <FlatButton onClick={this.handleEditClick}>Edit</FlatButton>
                    <FlatButton onClick={this.handleDeleteClick}>Delete</FlatButton>
                </CardActions>
                <ExerciseDeleteDialog 
                    open={this.state.deleteDialog.open} 
                    handleClose={this.handleDeleteDialogClose}
                    exercise={this.props.exercise}
                />
                <ExerciseDialog
                    open={this.state.exerciseDialog.open}
                    intent={this.state.exerciseDialog.intent}
                    exercise={this.state.exerciseDialog.exercise}
                    existingNames={this.props.existingNames}
                    handleClose={this.handleExerciseDialogClose}
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