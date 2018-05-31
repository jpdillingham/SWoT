import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWorkouts } from './WorkoutsActions'
import { fetchWorkoutsHistory } from './history/WorkoutsHistoryActions'
import { showSnackbar } from '../app/AppActions'

import { black, red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import FlatButton from 'material-ui/FlatButton'

import AddFloatingAddButton from '../shared/AddFloatingActionButton'
import WorkoutDialog from './WorkoutDialog';
import ActionSchedule from 'material-ui/svg-icons/action/schedule'
import AvStop from 'material-ui/svg-icons/av/stop'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import ActionInfo from 'material-ui/svg-icons/action/info'

import Spinner from '../shared/Spinner'
import WorkoutsListCard from './WorkoutsListCard'

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

        Promise.all([
            this.props.fetchWorkouts(),
            this.props.fetchWorkoutsHistory({ offset: 0, limit: 5, order: 'desc' })
        ]).then(responses => {
            this.setState({ api: { isExecuting: false, isErrored: false }})
        }, error => {
            this.props.showSnackbar('Error fetching Workout data: ' + error);
            this.setState({ api: { isExecuting: false, isErrored: true }});
        })
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleClick = (workoutId) => {
        this.navigate('/workouts/' + workoutId)
    }

    render() {
        return (
            this.state.api.isExecuting ? <Spinner size={48}/> : 
                this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div style={styles.grid}>
                        <WorkoutsListCard 
                            title={'In Progress'}
                            icon={<AvPlayArrow/>}
                            itemRightIcon={<AvPlayArrow color={black}/>}
                            workouts={this.props.workouts.filter(workout => workout.startTime !== undefined && workout.endTime === undefined)}
                            sort={'desc'}
                            timePrefix={'Started'}
                            timeField={'startTime'}
                            onClick={this.handleClick}
                            hideIfEmpty={true}
                        />
                        <WorkoutsListCard 
                            title={'Scheduled'}
                            icon={<ActionSchedule color={black}/>}
                            itemRightIcon={<AvPlayArrow color={black}/>}
                            workouts={this.props.workouts.filter(workout => workout.startTime === undefined)}
                            sort={'asc'}
                            timePrefix={'Scheduled for'}
                            timeField={'scheduledTime'}
                            onClick={this.handleClick}
                            hideIfEmpty={true}
                        />
                        <WorkoutsListCard 
                            title={'Completed'}
                            icon={<AvStop/>}
                            itemRightIcon={<ActionInfo color={black}/>}
                            workouts={this.props.workoutsHistory.workouts}
                            sort={'desc'}
                            timePrefix={'Completed'}
                            timeField={'endTime'}
                            onClick={this.handleClick}
                            hideIfEmpty={true}
                        >
                            <FlatButton 
                                label="View Full History" 
                                fullWidth={true}
                                onClick={() => this.navigate('/workouts/history')}
                            />
                        </WorkoutsListCard>
                        <AddFloatingAddButton dialog={<WorkoutDialog/>}/>
                    </div>
        )
    }
}

const mapStateToProps = (state) => ({
    workouts: state.workouts,
    workoutsHistory: state.workoutsHistory,
})

const mapDispatchToProps = {
    fetchWorkouts,
    fetchWorkoutsHistory,
    showSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Workouts)