import React, { Component } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

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
                    <List>
                        {this.props.workout.routine.exercises.map((e, index) => 
                            <ListItem 
                                key={index}
                                primaryText={e.name}
                                nestedItems={e.metrics.map((m, index) => 
                                    <ListItem 
                                        key={index}
                                        primaryText={m.name}/>
                                    )}
                            />
                        )}
                    </List>
                    {JSON.stringify(this.props.workout.routine)}
                </CardText>
            </Card>
        )
    }
}

export default WorkoutCard