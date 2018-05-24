import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWorkoutsHistory } from '../../workouts/history/WorkoutsHistoryActions'
import { fetchRoutines } from '../../routines/RoutinesActions'

import { black, red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'

import ActionRestore from 'material-ui/svg-icons/action/restore'
import ActionInfo from 'material-ui/svg-icons/action/info'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ContentClear from 'material-ui/svg-icons/content/clear'

import WorkoutsListCard from '../../workouts/WorkoutsListCard'
import WorkoutsHistoryOptions from './WorkoutsHistoryOptions'
import Spinner from '../../shared/Spinner'

const initialState = {
    workouts: [],
    filters: {
        offset: 0,
        limit: 5,
        order: 'desc',
        routineId: undefined,
        toTime: undefined,
        fromTime: undefined,
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
    constructor(props) {
        super(props);

        let defaulttoTime = new Date();
        defaulttoTime.setDate(defaulttoTime.getDate() + 1);
    
        let defaultfromTime = new Date(defaulttoTime);
        defaultfromTime.setDate(defaultfromTime.getDate() - 30);
    
        this.state = { 
            ...initialState, 
            filters: { 
                ...initialState.filters, 
                toTime: defaulttoTime.getTime(), 
                fromTime: defaultfromTime.getTime() 
            } 
        };        
    }

    componentWillMount() {
        this.refreshWorkoutsHistory(this.state.filters, 'loadApi');
        this.props.fetchRoutines();
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
        let routineChanged = this.state.filters.routineId !== filters.routineId;
        let fromTimeChanged = this.state.filters.fromTime !== filters.fromTime;
        let toTimeChanged = this.state.filters.toTime !== filters.toTime;

        if (routineChanged || fromTimeChanged || toTimeChanged) {
            filters.offset = 0;
        }

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
            [api]: { ...this.state[api], isExecuting: true }
        }, () => {
            this.props.fetchWorkoutsHistory(filters)
            .then(response => {
                this.setState({ filters: filters, [api]: { isExecuting: false, isErrored: false }})
            }, error => {
                this.setState({ filters: filters, [api]: { isExecuting: false, isErrored: true }})
            })
        })

    }

    render() {
        let workouts = this.props.workoutsHistory.workouts;
        let filters = this.state.filters;
        let start;
        let end;

        if (workouts) {
            start = filters.offset + 1;
            end = start - 1 + workouts.length;
        }
        
        let total = this.props.workoutsHistory.totalCount;

        return (
            this.state.loadApi.isExecuting ? <Spinner size={48}/> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div style={styles.grid}>
                        <WorkoutsListCard 
                            title={'History'}
                            icon={<ActionRestore/>}
                            options={
                                <WorkoutsHistoryOptions 
                                    filters={this.state.filters} 
                                    routines={this.props.routines}
                                    onChange={this.handleFiltersChange}
                                    disabled={this.state.refreshApi.isExecuting}
                                />
                            }
                            itemRightIcon={<ActionInfo/>}
                            workouts={workouts}
                            sort={this.state.filters.order}
                            timePrefix={'Completed'}
                            timeField={'endTime'}
                            onClick={this.handleWorkoutClick}
                            hideIfEmpty={false}
                            refreshing={this.state.refreshApi.isExecuting}
                            emptyContent={
                                <ListItem 
                                    primaryText={'No records match the current filter criteria'}
                                    leftIcon={<ContentClear/>}
                                />
                            }
                        >
                            <div style={styles.buttonRow}>
                                <FlatButton
                                    onClick={this.handlePreviousClick}
                                    disabled={this.state.refreshApi.isExecuting || start === 1}
                                    icon={<HardwareKeyboardArrowLeft/>}
                                />
                                <FlatButton 
                                    label={this.state.refreshApi.isExecuting ? ' ' : total > 0 ? start + '-' + end + ' of ' + total : 'No Results'}
                                    disabled={true}
                                    style={styles.paginationButton}
                                />
                                <FlatButton 
                                    onClick={this.handleNextClick}
                                    disabled={this.state.refreshApi.isExecuting || end === total} 
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
    routines: state.routines,
})

const mapDispatchToProps = {
    fetchWorkoutsHistory,
    fetchRoutines,
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsHistory)