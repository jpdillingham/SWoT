import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWorkoutsHistory } from './WorkoutsHistoryActions'

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import FlatButton from 'material-ui/FlatButton'

import ActionDone from 'material-ui/svg-icons/action/done'
import ActionInfo from 'material-ui/svg-icons/action/info'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

import WorkoutListCard from './WorkoutListCard'

const initialState = {
    workouts: [],
    pagination: {
        offset: 0,
        limit: 5
    },
    loadApi: {
        isExecuting: false,
        isErrored: false,
    },
    refreshApi: {
        isExecuting: false,
        isErrored: false,
    }
}

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
    },
    icon: {
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

class WorkoutsHistory extends Component {
    state = initialState;

    componentWillMount() {
        this.refreshWorkoutsHistory(this.state.pagination);
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleWorkoutClick = (workoutId) => {
        this.navigate('/workouts/' + workoutId)
    }

    handleNextClick = () => {
        this.setState({ 
            pagination: {
                ...this.state.pagination,
                offset: this.state.pagination.offset + this.state.pagination.limit
            }
        }, () => this.refreshWorkoutsHistory(this.state.pagination, 'refreshApi'))
    }

    handlePreviousClick = () => {
        this.setState({ 
            pagination: {
                ...this.state.pagination,
                offset: this.state.pagination.offset - this.state.pagination.limit
            }
        }, () => this.refreshWorkoutsHistory(this.state.pagination, 'refreshApi'))        
    }

    refreshWorkoutsHistory = (filters, api = 'loadApi') => {
        this.setState({ [api]: { ...this.state[api], isExecuting: true }})

        this.props.fetchWorkoutsHistory(filters)
        .then(response => {
            this.setState({ [api]: { isExecuting: false, isErrored: false }})
        }, error => {
            this.setState({ [api]: { isExecuting: false, isErrored: true }})
        })
    }

    render() {
        let workouts = this.props.workoutsHistory.workouts;
        let filters = this.props.workoutsHistory.filters;
        let start;
        let end;

        if (filters) {
            start = filters.offset + 1;
            end = start - 1 + workouts.length;
        }
        
        let total = this.props.workoutsHistory.totalCount;

        return (
            this.state.loadApi.isExecuting ? <CircularProgress style={styles.icon} /> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div style={styles.grid}>
                        <WorkoutListCard 
                            title={'Completed'}
                            icon={<ActionDone/>}
                            itemRightIcon={<ActionInfo/>}
                            workouts={this.props.workoutsHistory.workouts}
                            sort={'desc'}
                            timePrefix={'Completed'}
                            timeField={'endTime'}
                            onClick={this.handleWorkoutClick}
                        >
                            <FlatButton
                                onClick={this.handlePreviousClick}
                                disabled={start === 1}
                                icon={<HardwareKeyboardArrowLeft/>}
                            />
                            <span>{start + '-' + end + ' of ' + total}</span>
                            <FlatButton 
                                onClick={this.handleNextClick}
                                disabled={end === total} 
                                icon={<HardwareKeyboardArrowRight/>}
                            />
                        </WorkoutListCard>
                    </div>
        )
    }
}

const mapStateToProps = (state) => ({
    workoutsHistory: state.workoutsHistory,
})

const mapDispatchToProps = {
    fetchWorkoutsHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsHistory)