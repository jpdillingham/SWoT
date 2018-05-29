import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { sortByProp } from '../../../util';
import { WORKOUT_AVATAR_COLOR } from '../../../constants';

import { fetchWorkoutsHistory } from '../../workouts/history/WorkoutsHistoryActions';
import { fetchRoutines } from '../../routines/RoutinesActions';

import Spinner from '../../shared/Spinner';
import History from '../../shared/history/History';

import { red500 } from 'material-ui/styles/colors';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import SelectField from 'material-ui/SelectField';

const initialState = {
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
    clearIcon: {
        width: 18,
        height: 18,
        color: red500,
        cursor: 'pointer',
        marginBottom: 15,
        marginRight: 10,
    },
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
                fromTime: defaultfromTime.getTime(),
                routineId: this.props.match.params.id,
            } 
        };        
    }

    componentWillMount() {
        this.fetchHistory(this.state.filters, 'loadApi');
        this.props.fetchRoutines();
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleItemClick = (workoutId) => {
        this.navigate('/workouts/' + workoutId)
    }

    handleFiltersChange = (filters) => {
        this.fetchHistory({ ...filters, routineId: this.state.filters.routineId });
    }

    handleCustomFilterChange = (filter, event, index, value) => {
        this.fetchHistory({ ...this.state.filters, offset: 0, routineId: value })
    }

    handleCustomFilterClearClick = () => {
        this.fetchHistory({ ...this.state.filters, routineId: undefined })
    }

    fetchHistory = (filters, api = 'refreshApi') => {
        this.setState({ 
            [api]: { ...this.state[api], isExecuting: true },
            filters: filters
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
        return (
            this.state.loadApi.isExecuting ? <Spinner size={48}/> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div style={styles.grid}>
                        <History
                            title={'History'}
                            color={WORKOUT_AVATAR_COLOR}
                            data={this.props.workoutsHistory.workouts}
                            total={this.props.workoutsHistory.totalCount}
                            refreshing={this.state.refreshApi.isExecuting}
                            defaultFilters={this.state.filters}
                            onFilterChange={this.handleFiltersChange}
                            customFilters={
                                <span>
                                    <SelectField 
                                        floatingLabelText={'Filter By'}
                                        value={this.state.filters.routineId} 
                                        onChange={(event, index, value) => this.handleCustomFilterChange('routineId', event, index, value)}
                                        disabled={this.state.refreshApi.isExecuting}
                                    >
                                        {this.props.routines.map((r, index) => 
                                            <MenuItem 
                                                key={index} 
                                                value={r.id} 
                                                primaryText={r.name} 
                                            />                    
                                        )}
                                        {!this.state.filters.routineId || this.props.routines.find(r => r.id === this.state.filters.routineId) ? '' :
                                            <MenuItem key={-1} value={this.state.filters.routineId} primaryText={'Invalid Routine Id'}/>
                                        }
                                    </SelectField>
                                    {this.state.filters.routineId ? 
                                        <NavigationCancel style={styles.clearIcon} onClick={this.handleCustomFilterClearClick}/>
                                    : '' }
                                </span>
                            }
                        >
                            <List>
                                {this.props.workoutsHistory.workouts
                                .sort(sortByProp('endTime', this.state.filters.order))
                                .map((w, index) => 
                                    <ListItem
                                        key={index}
                                        primaryText={w.routine.name}
                                        secondaryText={'Completed ' + moment(w.endTime).calendar()}
                                        leftIcon={<ActionAssignmentTurnedIn/>}
                                        rightIcon={<ActionInfo/>}
                                        onClick={() => this.props.onClick(w.id)}
                                        disabled={this.props.refreshing}
                                    />
                                )}
                            </List>
                        </History>
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