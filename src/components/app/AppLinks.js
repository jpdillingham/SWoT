import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem'
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionDescription from 'material-ui/svg-icons/action/description'
import Divider from 'material-ui/Divider/Divider';
import Subheader from 'material-ui/Subheader/Subheader';

class AppLinks extends Component {
    render() {
        return (
            <div>
                <Subheader>Workouts</Subheader>
                <MenuItem containerElement={<Link to="/" />} leftIcon={<ActionAssignmentTurnedIn />}>List</MenuItem>
                <MenuItem containerElement={<Link to="/" />} leftIcon={<ActionAssignmentTurnedIn />}>Calendar</MenuItem>
                <Divider/>
                <Subheader>Reports</Subheader>
                <MenuItem containerElement={<Link to="/" />} leftIcon={<ActionAssignmentTurnedIn />}>Workouts</MenuItem>
                <MenuItem containerElement={<Link to="/" />} leftIcon={<ActionAssignmentTurnedIn />}>Exercises</MenuItem>
                <Divider/>
                <Subheader>Configuration</Subheader>
                <MenuItem containerElement={<Link to="/routines" />} leftIcon={<ActionAssignment />}>Routines</MenuItem>
                <MenuItem containerElement={<Link to="/exercises" />} leftIcon={<ActionDescription />}>Exercises</MenuItem>
            </div>
        )
    }
}

export default AppLinks

