import React, { Component } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'

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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            </Card>
        )
    }
}

export default WorkoutCard