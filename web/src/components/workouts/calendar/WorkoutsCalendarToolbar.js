import React, { Component } from 'react';
import moment from 'moment';

import { black } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

const styles = {
    toolbar: {
        marginBottom: 16,
    },
    arrowButton: {
        minWidth: 50,
        width: 50,
    },
    date:{
        color: black,
        fontSize: 16,
    },
};

class WorkoutsCalendarToolbar extends Component {
    handlePreviousClick = () => {
        this.props.date.setMonth(this.props.date.getMonth() - 1);
        this.props.onNavigate('prev');
    };

    handleNextClick = () => {
        this.props.date.setMonth(this.props.date.getMonth() + 1);
        this.props.onNavigate('next');
    };

    handleTodayClick = () => {
        const now = new Date();
        this.props.date.setMonth(now.getMonth());
        this.props.date.setYear(now.getFullYear());
        this.props.onNavigate('current');
    };

    render() {
        return (
            <div style={styles.toolbar}>
                <FlatButton 
                    style={styles.arrowButton} 
                    icon={<HardwareKeyboardArrowLeft/>} 
                    onClick={this.handlePreviousClick}
                />
                <FlatButton label={'Today'} onClick={this.handleTodayClick}/>
                <FlatButton 
                    style={styles.arrowButton} 
                    icon={<HardwareKeyboardArrowRight/>} 
                    onClick={this.handleNextClick}
                />
                <FlatButton 
                    disabled={true} 
                    style={styles.date}
                    labelStyle={styles.date}
                    label={moment(this.props.date).format('MMMM YYYY')}
                />
            </div>
        );
    }
}

export default WorkoutsCalendarToolbar;