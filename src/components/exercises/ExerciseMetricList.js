import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
}

class ExerciseMetricList extends Component {
    render() {
        return (
            <List>
                <Subheader>Metrics</Subheader>
                {this.props.metrics ? this.props.metrics.map(m =>                     
                        <ListItem
                            key={m.name}
                            leftIcon={<ActionAssessment/>}
                            rightIconButton={
                                <IconMenu iconButtonElement={
                                    <IconButton touch={true} tooltipPosition="bottom-left">
                                        <MoreVertIcon color={grey400} />
                                    </IconButton>
                                }>
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
