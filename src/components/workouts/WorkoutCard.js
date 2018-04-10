import React, { Component } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import WorkoutReport from './WorkoutReport';

class WorkoutCard extends Component {
    render() {
        return (
            <Card onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={this.props.workout.routine.name}
                    subtitle={this.props.workout.date}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText 
                    expandable={true}
                >
                    <WorkoutReport workout={this.props.workout}/>
                </CardText>
            </Card>
        )
    }
}

export default WorkoutCard