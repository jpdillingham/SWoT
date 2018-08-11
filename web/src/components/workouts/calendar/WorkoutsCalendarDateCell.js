import React, { Component } from 'react';

class WorkoutsCalendarDateCell extends Component {
    render() {
        let today = new Date();
        let day = new Date(this.props.value);

        let backgroundColor = today.toDateString() === day.toDateString() ? '#ffd4d1' : '';
        
        return (
            React.Children.map(this.props.children, child =>
                React.cloneElement(child, { style: { ...child.props.style, backgroundColor: backgroundColor }})
            )
        );
    }
}

export default WorkoutsCalendarDateCell;