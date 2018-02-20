import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem'
import Home from 'material-ui/svg-icons/action/home';
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import ActionAccessibility from 'material-ui/svg-icons/action/accessibility'

class Links extends Component {
    render() {
        return (
            <div>
                <MenuItem containerElement={<Link to="/" />} leftIcon={<Home />} >Home</MenuItem>
                <MenuItem containerElement={<Link to="/exercises" />} leftIcon={<ActionAccessibility />}>Exercises</MenuItem>
                <MenuItem containerElement={<Link to="/routines" />} leftIcon={<ContentPaste />}>Routines</MenuItem>
            </div>
        )
    }
}

export default Links

