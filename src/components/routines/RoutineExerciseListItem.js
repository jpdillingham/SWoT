import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Avatar from 'material-ui/Avatar';

import { EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import { transparent } from 'material-ui/styles/colors';

class RoutineExerciseListItem extends Component {
    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown'
        }

        return(
            <ListItem
                key={this.props.exercise.name}
                leftAvatar={<Avatar backgroundColor={transparent} src={process.env.PUBLIC_URL + '/img/' + exerciseImage.toLowerCase() + '.png'}></Avatar>}
                primaryText={this.props.exercise.name}
            />
        )
    }
}

export default RoutineExerciseListItem