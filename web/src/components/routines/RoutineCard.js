import React, { Component } from 'react';

import {Card, CardHeader, CardText } from 'material-ui/Card';
import { List } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Avatar from 'material-ui/Avatar';

import { CARD_WIDTH, ROUTINE_AVATAR_COLOR } from '../../constants';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RoutineExerciseListItem from './RoutineExerciseListItem'
import { black } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { ContentContentCopy, ActionDelete } from 'material-ui/svg-icons';

import ConfirmDialog from '../shared/ConfirmDialog'
import RoutineDialog from './RoutineDialog'

import { INTENTS } from '../../constants'

const styles = {
    iconMenu: {
        position: 'absolute',
        right: 0,
        top: 10,
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
    cardHeader: {
        backgroundColor: ROUTINE_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    container: {
        height: '100%'
    },
    card: {
        width: CARD_WIDTH,
        height: '100%',
        position: 'relative'
    },
    link: {
        cursor: 'pointer',
    },
}

const initialState = {
    deleteDialog: {
        open: false,
    },
    routineDialog: {
        open: false,
        routine: {},
        intent: INTENTS.EDIT
    } 
}

class RoutineCard extends Component {
    state = initialState;

    handleDeleteClick = () => {
        this.setState({ deleteDialog: { open: true }})
    }

    handleDeleteDialogClose = (result) => {
        if (result.cancelled) {
            this.setState({ deleteDialog: { open: false }})
        }
    }

    handleDuplicateClick = () => {
        let routine = Object.assign({}, this.props.routine)
        routine.name = routine.name + '(1)'

        this.setState(prevState => ({
            routineDialog: {
                open: true,
                routine: routine,
                intent: INTENTS.COPY
            }
        }))
    }

    handleRoutineDialogClose = () => {
        this.setState({
            routineDialog: { ...initialState.routineDialog }
        })
    }

    handleEditClick = () => {
        this.setState(prevState => ({
            routineDialog: {
                open: true,
                routine: this.props.routine,
                intent: INTENTS.EDIT,
            }
        }))
    }

    render() {
        return (
            <div style={styles.container}>
                <Card zDepth={2} style={styles.card}>
                    <CardHeader
                        title={this.props.routine.name}
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        avatar={<Avatar backgroundColor={ROUTINE_AVATAR_COLOR} color={black} size={36} icon={<ActionAssignment/>}></Avatar>}
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
                        <MenuItem primaryText="Duplicate" onClick={this.handleDuplicateClick} leftIcon={<ContentContentCopy/>}/>
                        <MenuItem primaryText="Delete" onClick={this.handleDeleteClick} leftIcon={<ActionDelete/>}/>
                    </IconMenu>
                    <CardText style={styles.text}>
                        <List>
                            {this.props.routine.exercises ? this.props.routine.exercises.map((e, index) =>                     
                                <RoutineExerciseListItem key={index} exercise={e} />
                            ) : ''}
                        </List>
                    </CardText>
                </Card>
                <ConfirmDialog 
                    title={'Delete Routine'}
                    buttonCaption={'Delete'}
                    onConfirm={this.props.onDelete}
                    onClose={this.handleDeleteDialogClose}
                    open={this.state.deleteDialog.open} 
                >
                    Are you sure you want to delete Routine '{this.props.routine.name}'?
                </ConfirmDialog>
                <RoutineDialog
                    open={this.state.routineDialog.open}
                    intent={this.state.routineDialog.intent}
                    routine={this.state.routineDialog.routine}
                    handleClose={this.handleRoutineDialogClose}
                />
            </div>
        )
    }
}

export default RoutineCard