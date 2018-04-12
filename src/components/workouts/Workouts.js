import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWorkouts } from '../workouts/WorkoutsActions'

import AddFloatingAddButton from '../shared/AddFloatingActionButton'
import WorkoutDialog from './WorkoutDialog';
import ActionSchedule from 'material-ui/svg-icons/action/schedule'
import ActionDone from 'material-ui/svg-icons/action/done'

import WorkoutList from './WorkoutList'

const initialState = {
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

class Workouts extends Component {
    state = initialState;

    componentWillMount() {
        this.setState({ api: { ...this.state.api, isExecuting: true }})

        this.props.fetchWorkouts()
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }})
            }, error => {
                this.setState({ api: { isExecuting: false, isErrored: true }})
            })
    }

    render() {
        return (
            <div>
                <WorkoutList 
                    title={'Active Workouts'}
                    icon={<ActionSchedule/>}
                    workouts={this.props.workouts.filter(workout => workout.endTime === undefined)}
                />
                <WorkoutList 
                    title={'Completed Workouts'}
                    icon={<ActionDone/>}
                    workouts={this.props.workouts.filter(workout => workout.endTime !== undefined)}
                />
                <AddFloatingAddButton dialog={<WorkoutDialog/>}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    workouts: state.workouts
})

const mapDispatchToProps = {
    fetchWorkouts
}

export default connect(mapStateToProps, mapDispatchToProps)(Workouts)