import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWorkoutsHistory } from './WorkoutsHistoryActions'

import { black, red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import FlatButton from 'material-ui/FlatButton'

import ActionDone from 'material-ui/svg-icons/action/done'
import ActionInfo from 'material-ui/svg-icons/action/info'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

import WorkoutsListCard from './WorkoutsListCard'
import WorkoutsHistoryOptions from './WorkoutsHistoryOptions'

const initialState = {
    workouts: [],
    filters: {
        offset: 0,
        limit: 5,
        order: 'desc'
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
    paginationButton: {
        color: black,
        width: 150
    },
    buttonRow: {
        textAlign: 'center'
    }
}

class WorkoutsHistory extends Component {
    state = initialState;

    componentWillMount() {
        this.refreshWorkoutsHistory(this.state.filters, 'loadApi');
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleWorkoutClick = (workoutId) => {
        this.navigate('/workouts/' + workoutId)
    }

    handleNextClick = () => {
        this.refreshWorkoutsHistory({
            ...this.state.filters,
            offset: this.state.filters.offset + this.state.filters.limit
        })
    }

    handleFiltersChange = (filters) => {
        this.refreshWorkoutsHistory(filters);
    }

    handlePreviousClick = () => {
        this.refreshWorkoutsHistory({
            ...this.state.filters,
            offset: this.state.filters.offset - this.state.filters.limit
        })        
    }

    refreshWorkoutsHistory = (filters, api = 'refreshApi') => {
        this.setState({ 
            filters: filters,
            [api]: { ...this.state[api], isExecuting: true }
        }, () => {
            this.props.fetchWorkoutsHistory(filters)
            .then(response => {
                this.setState({ [api]: { isExecuting: false, isErrored: false }})
            }, error => {
                this.setState({ [api]: { isExecuting: false, isErrored: true }})
            })
        })

    }

    render() {
        let workouts = this.props.workoutsHistory.workouts;
        let filters = this.state.filters;
        let start;
        let end;

        console.log(workouts)
        if (workouts) {
            start = filters.offset + 1;
            end = start - 1 + workouts.length;
        }
        
        let total = this.props.workoutsHistory.totalCount;

        return (
            this.state.loadApi.isExecuting ? <CircularProgress style={styles.icon} /> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div style={styles.grid}>
                        <WorkoutsListCard 
                            title={'Completed'}
                            icon={<ActionDone/>}
                            options={
                                <WorkoutsHistoryOptions 
                                    filters={this.state.filters} 
                                    onChange={this.handleFiltersChange}
                                />
                            }
                            itemRightIcon={<ActionInfo/>}
                            workouts={workouts}
                            sort={'desc'}
                            timePrefix={'Completed'}
                            timeField={'endTime'}
                            onClick={this.handleWorkoutClick}
                        >
                            <div style={styles.buttonRow}>
                                <FlatButton
                                    onClick={this.handlePreviousClick}
                                    disabled={start === 1}
                                    icon={<HardwareKeyboardArrowLeft/>}
                                />
                                <FlatButton 
                                    label={start + '-' + end + ' of ' + total}
                                    disabled={true}
                                    style={styles.paginationButton}
                                />
                                <FlatButton 
                                    onClick={this.handleNextClick}
                                    disabled={end === total} 
                                    icon={<HardwareKeyboardArrowRight/>}
                                />
                            </div>
                        </WorkoutsListCard>
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