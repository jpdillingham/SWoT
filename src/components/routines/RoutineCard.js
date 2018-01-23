import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Avatar from 'material-ui/Avatar';

import { ROUTINE_AVATAR_COLOR} from '../../constants';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RoutineExerciseListItem from './RoutineExerciseListItem'
import { black, white } from 'material-ui/styles/colors';

class RoutineCard extends Component {
    state = {
    }

    render() {
        return (
            <div style={styles.container}>
                <Card zDepth={2} style={styles.card}>
                    <CardHeader
                        title={this.props.routine.name}
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        avatar={<Avatar backgroundColor={ROUTINE_AVATAR_COLOR} color={white} size={36} icon={<ActionAssignment/>}></Avatar>}
                    >
                                        <FloatingActionButton 
                    secondary={false} 
                    zDepth={2} 
                    style={styles.fab}
                    mini={true}
                >
                    <ContentCreate />
                </FloatingActionButton>
                    </CardHeader>
                    <CardText style={styles.text}>
                        <List>
                            {this.props.routine.exercises ? this.props.routine.exercises.map(e =>                     
                                <RoutineExerciseListItem exercise={e} />
                            ) : ''}
                        </List>
                    </CardText>
                    <CardActions style={styles.actions}>
                        <FlatButton>Edit</FlatButton>
                        <FlatButton>Delete</FlatButton>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default RoutineCard

const styles = {
    fab: {
        margin: 0,
        top: 47,
        right: 20,
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
        color: '#FFFFFF'
    },
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
}