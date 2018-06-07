import React, { Component } from 'react';

import { black, red500, yellow500, green500 } from 'material-ui/styles/colors'

class WorkoutsCalendarEvent extends Component {
    render() {
        console.log(this.props)
        let event = this.props.event;
        let backgroundColor = event.status === 'scheduled' ? red500 : event.status === 'started' ? yellow500 : green500;

        return (
            <div>
                {React.Children.map(this.props.children, child =>
                    React.cloneElement(child, { 
                        style: { 
                            ...child.props.style, 
                            color: black,
                            backgroundColor: backgroundColor, 
                            borderRadius: 0 
                        } 
                    }))
                }
            </div>
        )
    }
}

export default WorkoutsCalendarEvent