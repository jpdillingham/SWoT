import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

class RoutineExerciseList extends Component {
    render() {
        return (
            <List>
                <Subheader>Exercises</Subheader>
                {this.props.exercises ? this.props.exercises.map(e =>                     
                        <ListItem
                            key={e.id}
                            leftIcon={<ActionAssessment/>}
                            rightIconButton={
                                <IconMenu iconButtonElement={
                                    <IconButton touch={true} tooltipPosition="bottom-left">
                                        <MoreVertIcon color={grey400} />
                                    </IconButton>
                                }>
                                    <MenuItem onClick={() => this.props.onMoveUpClick(e)}>Move Up</MenuItem>
                                    <MenuItem onClick={() => this.props.onMoveDownClick(e)}>Move Down</MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => this.props.onEditClick(e)}>Edit</MenuItem>
                                    <MenuItem onClick={() => this.props.onDeleteClick(e)}>Delete</MenuItem>
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
