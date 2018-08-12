import React, { Component } from 'react';

import { NavigationArrowUpward, NavigationArrowDownward } from 'material-ui/svg-icons';

const styles = {
    container: {
        width: '100%',
    },
    notHovered: {
        float: 'left',
        marginTop: -1,
    },
    hovered: {
        float: 'left',
        marginTop: 5,
        zIndex: 10000,
    },
    buttons: {
        float: 'right',
    },
};

class WorkoutStepTitle extends Component {
    handleMoveUpDownClick = (event, exercise, direction) => {
        this.props.onMoveUpDownClick(exercise, direction);
        event.stopPropagation();
    }

    render() {
        return (
            <div style={styles.container}>
                {this.props.workoutIsStarted && (this.props.isHovered || this.props.isActive) ? 
                    <div>
                        <span style={styles.hovered}>{this.props.exercise.name}</span>
                        {this.props.enabled && <div style={styles.buttons}>
                            {!this.props.isFirstExercise ? <NavigationArrowUpward onClick={(event) => this.handleMoveUpDownClick(event, this.props.exercise, 'up')}/> : ''}
                            {!this.props.isLastExercise ?
                                <NavigationArrowDownward onClick={(event) => this.handleMoveUpDownClick(event, this.props.exercise, 'down')}/> : ''}
                        </div>}
                    </div> :
                    <span style={styles.notHovered}>{this.props.exercise.name}</span> 
                }
            </div>
        );
    }
}

export default WorkoutStepTitle;