import React, { Component } from 'react';

import { black, red500, yellow500, green500 } from 'material-ui/styles/colors'
import { AvPlayArrow } from 'material-ui/svg-icons';

const styles = {
    container: {
        position: 'relative',
        borderRadius: 0
    },
    title: {
        position: 'absolute',
        marginTop: 5,
        textOverflow: 'ellipsis',
        color: black,
    }
}
class WorkoutsCalendarEvent extends Component {
    render() {
        let event = this.props.event;
        let backgroundColor = event.status === 'scheduled' ? red500 : event.status === 'started' ? yellow500 : green500;

        return (
            <div>
                {React.Children.map(this.props.children, child =>
                    <div {...child.props} style={{ ...styles.container, backgroundColor: backgroundColor}}>
                        <AvPlayArrow/>
                        <span style={styles.title}>{this.props.event.title}</span>
                    </div>
                )}
            </div>
        )
    }
}

export default WorkoutsCalendarEvent