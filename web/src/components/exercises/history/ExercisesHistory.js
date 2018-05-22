import React, { Component } from 'react';
import { connect } from 'react-redux';

import { black, red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import Spinner from '../../shared/Spinner'

import { fetchExercisesHistory } from './ExercisesHistoryActions'

import History from '../../shared/history/History';
import { EXERCISE_AVATAR_COLOR } from '../../../constants'

const initialState = {
    workouts: [],
    filters: {
        offset: 0,
        limit: 5,
        order: 'desc',
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

class ExercisesHistory extends Component {
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

    componentWillMount = () => {
        this.fetchHistory(this.state.filters, 'loadApi');
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleItemClick = (id) => {
        this.navigate('/exercises/' + id)
    }

    handleFiltersChange = (filters) => {
        this.fetchHistory(filters);
    }

    fetchHistory = (filters, api = 'refreshApi') => {
        this.setState({ 
            [api]: { ...this.state[api], isExecuting: true }
        }, () => {
            this.props.fetchExercisesHistory(filters)
            .then(response => {
                this.setState({ filters: filters, [api]: { isExecuting: false, isErrored: false }})
            }, error => {
                this.setState({ filters: filters, [api]: { isExecuting: false, isErrored: true }})
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
                            color={EXERCISE_AVATAR_COLOR}
                            data={this.props.exercisesHistory.exercises}
                            total={this.props.exercisesHistory.totalCount}
                            refreshing={this.state.refreshApi.isExecuting}
                            defaultFilters={this.state.filters}
                            onFilterChange={this.handleFiltersChange}
                        >
                        </History>
                    </div>
        )
    }
}

const mapStateToProps = (state) => ({
    exercisesHistory: state.exercisesHistory,
})

const mapDispatchToProps = {
    fetchExercisesHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesHistory)