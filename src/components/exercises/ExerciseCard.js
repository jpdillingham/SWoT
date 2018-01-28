import React, { Component } from 'react';

import {Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import Avatar from 'material-ui/Avatar';

import ExerciseDialog from './ExerciseDialog'
import ExerciseDeleteDialog from './ExerciseDeleteDialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR, INTENTS } from '../../constants';

const styles = {
    deleteDialog: {
        zIndex: 2000,
    },
    container: {
        height: '100%'
    },
    cardHeader: {
        backgroundColor: EXERCISE_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    iconMenu: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
    card: {
        width: CARD_WIDTH,
        height: '100%',
        position: 'relative',
    },
    fab: {
        margin: 0,
        top: 47,
        right: 40,
        bottom: 'auto',
        left: 'auto',
        position: 'absolute',
        zIndex: 1000,
    },
    link: {
        cursor: 'pointer',
    },
}

const initialState = {
    deleteDialog: {
        open: false,
    },
    exerciseDialog: {
        open: false,
        exercise: {},
        intent: INTENTS.EDIT
    }    
}

class ExerciseCard extends Component {
    state = initialState

    handleDeleteDialogClose = (result) => {
        this.setState({ deleteDialog: { open: false }})
    }

    handleExerciseDialogClose = () => {
        this.setState({
            exerciseDialog: { ...initialState.exerciseDialog }
        })
    }

    handleEditClick = () => {
        this.setState(prevState => ({
            exerciseDialog: {
                open: true,
                exercise: this.props.exercise,
                intent: INTENTS.EDIT,
            }
        }))
    }

    handleDeleteClick = () => {
        this.setState({ deleteDialog: { open: true }})
    }

    handleDuplicateClick = () => {
        let exercise = Object.assign({}, this.props.exercise)
        exercise.name = exercise.name + '(1)'

        this.setState(prevState => ({
            exerciseDialog: {
                open: true,
                exercise: exercise,
                intent: INTENTS.COPY
            }
        }))
    }

    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown'
        }

        return (
            <div style={styles.container}>
                <Card zDepth={2} style={styles.card}>
                    <CardHeader                        
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        title={
                            <span 
                                style={styles.link}
                                onClick={() => window.open(this.props.exercise.url)}
                            >
                                {this.props.exercise.name}
                            </span>
                        }
                        avatar={
                            <Avatar 
                                backgroundColor={EXERCISE_AVATAR_COLOR} 
                                size={32} 
                                src={process.env.PUBLIC_URL + '/img/' + exerciseImage.toLowerCase() + '.png'} 
                            />
                        }
                    >
                        <FloatingActionButton 
                            secondary={false} 
                            zDepth={2} 
                            style={styles.fab}
                            mini={true}
                            onClick={this.handleEditClick}
                        >
                            <ContentCreate />
                        </FloatingActionButton>
                    </CardHeader>
                    <IconMenu
                            style={styles.iconMenu}
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="Duplicate" onClick={this.handleDuplicateClick} />
                        <MenuItem primaryText="Delete" onClick={this.handleDeleteClick} />
                    </IconMenu>
                    <CardText style={styles.text}>
                        <List>
                            {this.props.exercise.metrics ? this.props.exercise.metrics.map(m =>                     
                                <ListItem
                                    key={m.name}
                                    leftIcon={<ActionAssessment color={'#000000'}/>}
                                    primaryText={m.name}
                                    secondaryText={m.uom ? m.uom : ''}
                                />
                            ) : ''}
                        </List>
                    </CardText>
                </Card>
                <ExerciseDeleteDialog 
                    open={this.state.deleteDialog.open} 
                    handleClose={this.handleDeleteDialogClose}
                    exercise={this.props.exercise}
                    style={styles.deleteDialog}
                />
                <ExerciseDialog
                    open={this.state.exerciseDialog.open}
                    intent={this.state.exerciseDialog.intent}
                    exercise={this.state.exerciseDialog.exercise}
                    handleClose={this.handleExerciseDialogClose}
                />
            </div>
        )
    }
}

export default ExerciseCard