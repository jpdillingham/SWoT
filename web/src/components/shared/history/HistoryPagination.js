import React, { Component } from 'react';

import { red500 } from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem'
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel'
import DatePicker from 'material-ui/DatePicker'
import { black } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import FlatButton from 'material-ui/FlatButton'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

import { FILTER_SORT_ORDER_OPTIONS, FILTER_LIMIT_OPTIONS } from '../../../constants'

const styles = {
    paginationButton: {
        color: black,
        width: 150
    },
    buttonRow: {
        textAlign: 'center'
    }
}

class HistoryPagination extends Component {
    render() {
        return (
            <div style={styles.buttonRow}>
                <FlatButton
                    onClick={this.props.onPreviousClick}
                    disabled={this.props.refreshing || this.props.start === 1}
                    icon={<HardwareKeyboardArrowLeft/>}
                />
                <FlatButton 
                    label={this.props.refreshing ? ' ' : 
                        this.props.total > 0 ? this.props.start + '-' + this.props.end + ' of ' + this.props.total : 'No Results'
                    }
                    disabled={true}
                    style={styles.paginationButton}
                />
                <FlatButton 
                    onClick={this.props.onNextClick} 
                    icon={<HardwareKeyboardArrowRight/>}
                    disabled={this.props.refreshing || this.props.end === this.props.total}
                />
            </div>
        )
    }
}

export default HistoryPagination