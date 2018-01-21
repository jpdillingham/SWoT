import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import Avatar from 'material-ui/Avatar';

import ExerciseDialog from './ExerciseDialog'
import ExerciseDeleteDialog from './ExerciseDeleteDialog';

import { EXERCISE_TYPES } from '../../constants';

class ExerciseCard extends Component {
    state = {
        deleteDialog: {
            open: false,
        },
        exerciseDialog: {
            open: false,
            exercise: {},
        }
    }

    handleDeleteDialogClose = (result) => {
        this.setState({ deleteDialog: { open: false }})
    }

    handleExerciseDialogClose = (result) => {
        this.setState(prevState => ({
            exerciseDialog: {
                open: false,
                exercise: {}
            }
        }))
    }

    handleEditClick = () => {
        this.setState(prevState => ({
            exerciseDialog: {
                open: true,
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
            <div style={styles.container}>
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
                        avatar={<Avatar backgroundColor="#64b5f6" src={process.env.PUBLIC_URL + '/img/' + exerciseImage.toLowerCase() + '.png'}></Avatar>}
                        style={{marginBottom: -20}}
                    />
                    <CardText style={styles.text}>
                        <List>
                            <Subheader>Metrics</Subheader>
                            {this.props.exercise.metrics ? this.props.exercise.metrics.map(m =>                     
                                <ListItem
                                    key={m.name}
                                    leftIcon={<ActionAssessment/>}
                                    primaryText={m.name}
                                    secondaryText={m.uom ? m.uom : ''}
                                />
                            ) : ''}
                        </List>
                    </CardText>
                    <CardActions style={styles.actions}>
                        <FlatButton onClick={this.handleEditClick}>Edit</FlatButton>
                        <FlatButton onClick={this.handleDeleteClick}>Delete</FlatButton>
                    </CardActions>
                </Card>
                <ExerciseDeleteDialog 
                    open={this.state.deleteDialog.open} 
                    handleClose={this.handleDeleteDialogClose}
                    exercise={this.props.exercise}
                />
                <ExerciseDialog
                    open={this.state.exerciseDialog.open}
                    intent={'edit'}
                    exercise={this.state.exerciseDialog.exercise}
                    handleClose={this.handleExerciseDialogClose}
                />
            </div>
        )
    }
}

export default ExerciseCard

const styles = {
    container: {
        height: '100%'
    },
    card: {
        width: 400,
        height: '100%',
        position: 'relative'
    },
    text: {
        marginBottom: 40
    },
    actions: {
        position: 'absolute',
        bottom: 0
    },
    link: {
        cursor: 'pointer',
    },
    metric: {
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