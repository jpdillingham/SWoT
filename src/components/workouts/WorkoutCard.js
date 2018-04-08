import React, { Component } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'

class WorkoutCard extends Component {
    handleExpandChange = (expanded) => {
        console.log(expanded)
    }

    render() {
        return (
            <Card onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={this.props.title}
                    subtitle={this.props.subtitle}
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