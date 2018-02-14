import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

import { EXERCISE_TYPES } from '../../constants';

const styles = {
    leftIcon: {
        width: '32px',
        height: '32px',
        marginTop: 7,
    }
}

class RoutineExerciseList extends Component {
    getImage = (type) => {
        if (EXERCISE_TYPES.indexOf(type) === -1) { 
            type = 'unknown'
        }
    }

    render() {
        return (
            <List>
                <Subheader>Exercises</Subheader>
                {this.props.exercises ? this.props.exercises.map((e, index) =>                     
                        <ListItem
                            key={index}
                            leftIcon={                        
                            <img alt={e.type} 
                                style={styles.leftIcon} 
                                src={process.env.PUBLIC_URL + '/img/' + e.type.toLowerCase() + '.png'}
                            />
                            }
                            rightIconButton={
                                <IconMenu iconButtonElement={
                                    <IconButton touch={true} tooltipPosition="bottom-left">
                                        <MoreVertIcon color={grey400} />
                                    </IconButton>
                                }>
                                    <MenuItem onClick={() => this.props.onMoveUpClick(index)}>Move Up</MenuItem>
                                    <MenuItem onClick={() => this.props.onMoveDownClick(index)}>Move Down</MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => this.props.onDeleteClick(index)}>Delete</MenuItem>
                                </IconMenu>
                            }
                            primaryText={e.name}
                        />
                    ) : ''}
            </List>
        )
    }
}

export default RoutineExerciseList
