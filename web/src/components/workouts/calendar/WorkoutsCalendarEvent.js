import React, { Component } from 'react';

import { black, red500, yellow500, green500 } from 'material-ui/styles/colors'
import { AvPlayArrow, ActionSchedule, AvStop } from 'material-ui/svg-icons';

const styles = {
    container: {
        position: 'relative',
        borderRadius: 0,
        height: 28,
    },
    icon: {
        width: 16,
        height: 16,
        marginTop: 3,
        float: 'right'
    },
    title: {
        position: 'absolute',
        marginTop: 3,
        textOverflow: 'ellipsis',
        color: black,
        marginLeft: 3,
        float: 'left'
    }
}
class WorkoutsCalendarEvent extends Component {
    render() {
        let event = this.props.event;
        let backgroundColor = event.status === 'scheduled' ? red500 : event.status === 'started' ? yellow500 : green500;
        let icon = event.status === 'scheduled' ? <ActionSchedule style={styles.icon}/> : 
            event.status === 'started' ? <AvPlayArrow style={styles.icon}/> : <AvStop style={styles.icon}/>;

        return (
            <div>
                {React.Children.map(this.props.children, child =>
                    <div {...child.props} style={{ ...styles.container, backgroundColor: backgroundColor}}>
                        <span style={styles.title}>{this.props.event.title}</span>{icon}
                    </div>
                )}
            </div>
        )
    }
}

export default WorkoutsCalendarEvent