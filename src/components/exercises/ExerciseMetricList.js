import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {grey400, black} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider'


class ExerciseMetricList extends Component {
    render() {
        return (
            <List>
                <Subheader>Metrics</Subheader>
                {this.props.metrics ? this.props.metrics.map((m, index) =>                     
                        <ListItem
                            key={m.name}
                            leftIcon={<ActionAssessment color={black} />}
                            rightIconButton={
                                <IconMenu iconButtonElement={
                                    <IconButton touch={true} tooltipPosition="bottom-left">
                                        <MoreVertIcon color={grey400} />
                                    </IconButton>
                                }>
                                    <MenuItem onClick={() => this.props.onMoveUpClick(index)}>Move Up</MenuItem>
                                    <MenuItem onClick={() => this.props.onMoveDownClick(index)}>Move Down</MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => this.props.onEditClick(m)}>Edit</MenuItem>
                                    <MenuItem onClick={() => this.props.onDeleteClick(m)}>Delete</MenuItem>
                                </IconMenu>
                            }
                            primaryText={m.name}
                            secondaryText={m.uom ? m.uom : ''}
                        />
                    ) : ''}
            </List>
        )
    }
}

export default ExerciseMetricList
