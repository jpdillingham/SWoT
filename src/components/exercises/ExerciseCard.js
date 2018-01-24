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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import { black } from 'material-ui/styles/colors';

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

    handleMenuClick = (event, menuItem, index) => {
        console.log(event, menuItem, index)
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
                        
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        title={
                            <span 
                                style={styles.link}
                                onClick={() => window.open(this.props.exercise.url)}
                            >
                                {this.props.exercise.name}
                                { /*<IconButton style={styles.exitIconButton} iconStyle={styles.exitIcon}>
                                    <ActionExitToApp/>
                        </IconButton> */ }
                            </span>
                        }
                        avatar={<Avatar backgroundColor={EXERCISE_AVATAR_COLOR} size={32} src={process.env.PUBLIC_URL + '/img/' + exerciseImage.toLowerCase() + '.png'}></Avatar>}
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
                        <MenuItem primaryText="Duplicate" onClick={this.handleMenuClick} />
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
                    <CardActions style={styles.actions}>
                        {/*<FlatButton onClick={this.handleEditClick}>Edit</FlatButton>
                        <FlatButton onClick={this.handleDeleteClick}>Delete</FlatButton>*/}
                    </CardActions>
                </Card>
                <ExerciseDeleteDialog 
                    open={this.state.deleteDialog.open} 
                    handleClose={this.handleDeleteDialogClose}
                    exercise={this.props.exercise}
                    style={styles.deletedialog}
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
        width: 390,
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
    text: {
        /* marginBottom: 40 */
    },
    actions: {
        position: 'absolute',
        bottom: 0
    },
    exitIconButton: {
        border: 0,
        width: 24,
        height: 24,
    },
    exitIcon: {
        width: 24,
        height: 24,
        marginTop: -10,
        marginLeft: -5,
        marginBottom: -5,
        color: '#1b5e20',
    },
    link: {
        cursor: 'pointer',
    },
}