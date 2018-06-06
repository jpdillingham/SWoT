import React, { Component } from 'react';

import { black } from 'material-ui/styles/colors'

const styles = {
}

class WorkoutsCalendarEvent extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                {React.Children.map(this.props.children, child =>
                    React.cloneElement(child, { 
                        style: { ...child.props.style, color: black, borderRadius: 0 } 
                    }))
                }
            </div>
        )
    }
}

export default WorkoutsCalendarEvent