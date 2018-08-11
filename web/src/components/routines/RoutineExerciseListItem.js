import React, { Component } from 'react';

import { ListItem } from 'material-ui/List';

import { EXERCISE_TYPES } from '../../constants';

class RoutineExerciseListItem extends Component {
    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown';
        }

        return(
            <ListItem
                key={this.props.exercise.name}
                leftIcon={
                    <img 
                        alt={this.props.exercise.type} 
                        style={styles.leftIcon} 
                        src={process.env.PUBLIC_URL + '/img/' + exerciseImage.toLowerCase() + '.png'}
                    />
                }
                primaryText={this.props.exercise.name}
            />
        );
    }
}

export default RoutineExerciseListItem;

const styles = {
    leftIcon: {
        width: '32px',
        height: '32px',
        marginTop: 7,
    },
};