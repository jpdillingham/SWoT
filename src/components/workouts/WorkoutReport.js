import React, { Component } from 'react'

class WorkoutReport extends Component {
    render() {
        return (
            <ul>
                {this.props.workout.routine.exercises.map(e => 
                    <li>{e.name}</li>
                )}
            </ul>
        )
    }
}

export default WorkoutReport