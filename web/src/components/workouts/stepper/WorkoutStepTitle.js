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
}

class WorkoutStepTitle extends Component {
    handleMoveUpClick = (event, exercise) => {
        this.props.onMoveUpClick(exercise);
        event.stopPropagation();
    }

    handleMoveDownClick = (event, exercise) => {
        this.props.onMoveDownClick(exercise);
        event.stopPropagation();
    }

    render() {
        return (
            <div style={styles.container}>
                {this.props.workoutIsActive && (this.props.isHovered || this.props.isActive) ? 
                    <div>
                        <span style={styles.hovered}>{this.props.exercise.name}</span>
                        <div style={styles.buttons}>
                            {!this.props.isFirstExercise ? <NavigationArrowUpward onClick={(event) => this.handleMoveUpClick(event, this.props.exercise)}/> : ''}
                            {!this.props.isLastExercise ?
                                <NavigationArrowDownward onClick={(event) => this.handleMoveDownClick(event, this.props.exercise)}/> : ''}
                        </div>
                    </div> :
                    <span style={styles.notHovered}>{this.props.exercise.name}</span> 
                }
            </div>
        )
    }
}

export default WorkoutStepTitle