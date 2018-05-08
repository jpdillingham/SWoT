import React, { Component } from 'react';
import { connect } from 'react-redux';

import MDSpinner from 'react-md-spinner'

import { fetchWorkoutsHistory } from './WorkoutsHistoryActions'
import { fetchRoutines } from '../routines/RoutinesActions'

import { black, red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'

import ActionRestore from 'material-ui/svg-icons/action/restore'
import ActionInfo from 'material-ui/svg-icons/action/info'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ContentClear from 'material-ui/svg-icons/content/clear'

import WorkoutsListCard from './WorkoutsListCard'
import WorkoutsHistoryOptions from './WorkoutsHistoryOptions'

const initialState = {
    workouts: [],
    filters: {
        offset: 0,
        limit: 5,
        order: 'desc',
        routineId: undefined,
        toDate: undefined,
        fromDate: undefined,
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

        let defaultToDate = new Date();
        defaultToDate.setDate(defaultToDate.getDate() + 1);
    
        let defaultFromDate = new Date(defaultToDate);
        defaultFromDate.setDate(defaultFromDate.getDate() - 30);
    
        this.state = { 
            ...initialState, 
            filters: { 
                ...initialState.filters, 
                toDate: defaultToDate.getTime(), 
                fromDate: defaultFromDate.getTime() 
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
        let fromDateChanged = this.state.filters.fromDate !== filters.fromDate;
        let toDateChanged = this.state.filters.toDate !== filters.toDate;

        if (routineChanged || fromDateChanged || toDateChanged) {
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
            this.state.loadApi.isExecuting ? <CircularProgress style={styles.icon} /> : 
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
                                    label={this.state.refreshApi.isExecuting ? '' : total > 0 ? start + '-' + end + ' of ' + total : 'No Results'}
                                    disabled={true}
                                    style={styles.paginationButton}
                                    icon={this.state.refreshApi.isExecuting ? <MDSpinner singleColor={'#000'} size={20}/> : ''}
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