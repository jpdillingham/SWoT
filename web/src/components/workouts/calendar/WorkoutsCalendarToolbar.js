import React, { Component } from 'react';
import moment from 'moment'

import { black } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

class WorkoutsCalendarToolbar extends Component {
    goToBack = () => {
        this.props.date.setMonth(this.props.date.getMonth() - 1);
        this.props.onNavigate('prev');
    };

    goToNext = () => {
        this.props.date.setMonth(this.props.date.getMonth() + 1);
        this.props.onNavigate('next');
    };

    goToCurrent = () => {
        const now = new Date();
        this.props.date.setMonth(now.getMonth());
        this.props.date.setYear(now.getFullYear());
        this.props.onNavigate('current');
    };

    label = () => {
        const date = moment(this.props.date);
        return (
        <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
        );
    };

    render() {
        return (
            <div>
                <FlatButton icon={<HardwareKeyboardArrowLeft/>} onClick={this.goToBack}/>
                <FlatButton label={'Today'} onClick={this.goToCurrent}/>
                <FlatButton icon={<HardwareKeyboardArrowRight/>} onClick={this.goToNext}/>
            </div>
        )
    }
}

export default WorkoutsCalendarToolbar