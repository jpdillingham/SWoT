import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';

class SaveRetryFlatButton extends Component {
    render() {
        return (
            <FlatButton 
                label={this.props.api.isErrored ? 'Retry' : 'Save'}
                onClick={this.props.onClick} 
                disabled={
                    (Object.keys(this.props.validation)
                        .find(e => this.props.validation[e] !== '') !== undefined) || (this.props.api.isExecuting)
                }
            />
        )
    }
}

export default SaveRetryFlatButton
