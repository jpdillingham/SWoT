import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem'
import Home from 'material-ui/svg-icons/action/home';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionDescription from 'material-ui/svg-icons/action/description'

class Links extends Component {
    render() {
        return (
            <div>
                <MenuItem containerElement={<Link to="/" />} leftIcon={<ActionAssignmentTurnedIn />} >Workouts</MenuItem>
                <MenuItem containerElement={<Link to="/routines" />} leftIcon={<ActionAssignment />}>Routines</MenuItem>
                <MenuItem containerElement={<Link to="/exercises" />} leftIcon={<ActionDescription />}>Exercises</MenuItem>
            </div>
        )
    }
}

export default Links

