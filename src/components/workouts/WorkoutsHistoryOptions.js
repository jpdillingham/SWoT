import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWorkoutsHistory } from './WorkoutsHistoryActions'

import { black, red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import FlatButton from 'material-ui/FlatButton'

import ActionDone from 'material-ui/svg-icons/action/done'
import ActionInfo from 'material-ui/svg-icons/action/info'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField/SelectField';

const limitOptions = [ 5, 10, 25, 50 ];

const styles = {
}

class WorkoutsHistoryOptions extends Component {
    handleLimitChange = (event, index, value) => {
        this.props.onChange({ ...this.props.filters, limit: value });
    }

    render() {
        return (
            <SelectField value={this.props.filters.limit} onChange={this.handleLimitChange}>
                {limitOptions.map((o, index) => 
                    <MenuItem key={index} value={o} primaryText={o} />                    
                )}
            </SelectField>
        )
    }
}

export default WorkoutsHistoryOptions