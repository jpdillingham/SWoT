import React, { Component } from 'react'

class WorkoutReportCard extends Component {
    render() {
        return (
            <ul>
                {this.props.workout.routine.exercises.map(e => 
                    <li key={e.id}>
                        {e.name}
                        <ul>
                            {e.metrics.map((m, index) => 
                                <li key={index}>{m.name + (m.uom ? ' (' + m.uom + ')' : '') + ': ' + m.value}</li>
                            )}
                        </ul>
                    </li>
                )}
                <li>
                    Notes
                    <ul><li>{this.props.workout.notes}</li></ul>
                </li>
            </ul>
        )
    }
}

export default WorkoutReportCard