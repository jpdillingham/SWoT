import React, { Component } from 'react';

import { black } from 'material-ui/styles/colors';
import { AvPlayArrow, ActionSchedule, AvStop } from 'material-ui/svg-icons';

const styles = {
    container: {
        position: 'relative',
        borderRadius: 0,
        border: 0,
        height: 24,
        display: 'block',
    },
    icon: {
        width: 14,
        height: 14,
        marginTop: 3,
        float: 'right',
    },
    title: {
        position: 'absolute',
        marginTop: 3,
        textOverflow: 'ellipsis',
        color: black,
        float: 'left',
        whiteSpace: 'pre',
        overflow: 'hidden',
        width: 'calc(100% - 25px)',
    },
};
class WorkoutsCalendarEvent extends Component {
    render() {
        let event = this.props.event;
        let icon = event.status === 'scheduled' ? <ActionSchedule style={{ ...styles.icon, color: event.fontColor}}/> : 
            event.status === 'started' ? <AvPlayArrow style={{ ...styles.icon, color: event.fontColor}}/> : <AvStop style={{ ...styles.icon, color: event.fontColor}}/>;

        console.log(event);
        return (
            <div>
                {React.Children.map(this.props.children, child =>
                    <div 
                        {...child.props}
                        style={{ ...styles.container, backgroundColor: event.color }}
                    >
                        <div style={{ ...styles.title, color: event.fontColor }}>{this.props.event.title}</div>{icon}
                    </div>
                )}
            </div>
        );
    }
}

export default WorkoutsCalendarEvent;