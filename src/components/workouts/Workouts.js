import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWorkouts } from '../workouts/WorkoutsActions'

import AddFloatingAddButton from '../shared/AddFloatingActionButton'
import WorkoutDialog from './WorkoutDialog';
import ActionSchedule from 'material-ui/svg-icons/action/schedule'
import ActionDone from 'material-ui/svg-icons/action/done'
import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import ActionInfo from 'material-ui/svg-icons/action/info'

import WorkoutList from './WorkoutList'

const initialState = {
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
    },
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
            <div style={styles.grid}>
                <WorkoutList 
                    title={'Active Workouts'}
                    icon={<ActionSchedule/>}
                    itemRightIcon={<AVPlayArrow/>}
                    workouts={this.props.workouts.filter(workout => workout.endTime === undefined)}
                    timePrefix={'Started'}
                    timeField={'startTime'}
                />
                <WorkoutList 
                    title={'Completed Workouts'}
                    icon={<ActionDone/>}
                    itemRightIcon={<ActionInfo/>}
                    workouts={this.props.workouts.filter(workout => workout.endTime !== undefined)}
                    timePrefix={'Completed'}
                    timeField={'endTime'}
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