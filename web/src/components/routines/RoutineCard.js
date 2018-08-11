import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {Card, CardHeader, CardText } from 'material-ui/Card';
import { List } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Avatar from 'material-ui/Avatar';

import { CARD_WIDTH } from '../../constants';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RoutineExerciseListItem from './RoutineExerciseListItem';
import { red500 } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { ContentContentCopy, ActionDelete } from 'material-ui/svg-icons';
import Divider from 'material-ui/Divider';
import ActionHistory from 'material-ui/svg-icons/action/history';

import ConfirmDialog from '../shared/ConfirmDialog';
import RoutineDialog from './RoutineDialog';
import RoutineHistoryDialog from './history/RoutineHistoryDialog';

import { fontContrastColor } from '../../util';
import { INTENTS } from '../../constants';

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
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    container: {
        height: '100%',
    },
    card: {
        width: CARD_WIDTH,
        height: '100%',
        position: 'relative',
    },
    link: {
        cursor: 'pointer',
    },
};

const initialState = {
    deleteDialog: {
        open: false,
    },
    routineDialog: {
        open: false,
        routine: {},
        intent: INTENTS.EDIT,
    },
    historyDialog: {
        open: false,
    },
};

class RoutineCard extends Component {
    state = initialState;

    handleDeleteClick = () => {
        this.setState({ deleteDialog: { open: true }});
    }

    handleDeleteDialogClose = (result) => {
        if (result.cancelled) {
            this.setState({ deleteDialog: { open: false }});
        }
    }

    handleDuplicateClick = () => {
        let routine = Object.assign({}, this.props.routine);
        routine.name = routine.name + '(1)';

        this.setState(prevState => ({
            routineDialog: {
                open: true,
                routine: routine,
                intent: INTENTS.COPY,
            },
        }));
    }

    handleHistoryClick = () => {
        this.setState({ historyDialog: { open: true }});
    }

    handleHistoryDialogClose = () => {
        this.setState({ historyDialog: { open: false }});
    }

    handleRoutineDialogClose = () => {
        this.setState({
            routineDialog: { ...initialState.routineDialog },
        });
    }

    handleEditClick = () => {
        this.setState(prevState => ({
            routineDialog: {
                open: true,
                routine: this.props.routine,
                intent: INTENTS.EDIT,
            },
        }));
    }

    render() {
        let color = this.props.routine.color;
        color = !color || color === 0 ? red500 : color;

        let fontColor = fontContrastColor(color);

        return (
            <div style={styles.container}>
                <Card zDepth={2} style={styles.card}>
                    <CardHeader
                        title={this.props.routine.name}
                        titleStyle={{ ...styles.cardTitle, color: fontColor }}
                        style={{ ...styles.cardHeader, backgroundColor: color }}
                        avatar={
                            <Avatar 
                                backgroundColor={color} 
                                color={fontContrastColor(color)} 
                                size={36} 
                                icon={<ActionAssignment/>}>
                            </Avatar>
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
                            iconButtonElement={<IconButton><MoreVertIcon color={fontColor}/></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="Duplicate" onClick={this.handleDuplicateClick} leftIcon={<ContentContentCopy/>}/>
                        <MenuItem primaryText="Delete" onClick={this.handleDeleteClick} leftIcon={<ActionDelete/>}/>
                        <Divider/>
                        <MenuItem primaryText="History" onClick={this.handleHistoryClick} leftIcon={<ActionHistory/>}/>
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
                <RoutineHistoryDialog
                    open={this.state.historyDialog.open}
                    onClose={this.handleHistoryDialogClose}
                    routine={this.props.routine}
                />
            </div>
        );
    }
}

export default withRouter(RoutineCard);