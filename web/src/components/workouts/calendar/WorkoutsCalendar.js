import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { sortByProp } from '../../../util';
import { WORKOUT_AVATAR_COLOR } from '../../../constants';

import { fetchWorkoutsHistory } from '../../workouts/history/WorkoutsHistoryActions';
import { fetchWorkouts } from '../WorkoutsActions';
import { setTitle, showSnackbar } from '../../app/AppActions';

import Spinner from '../../shared/Spinner';
import History from '../../shared/history/History';

import { black, red500 } from 'material-ui/styles/colors';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import SelectField from 'material-ui/SelectField';

const initialState = {
    filters: {},
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

class WorkoutsCalendar extends Component {
    constructor(props) {
        super(props);

        let defaulttoTime = new Date();
        defaulttoTime.setDate(defaulttoTime.getDate() + 1);
    
        let defaultfromTime = new Date(defaulttoTime);
        defaultfromTime.setDate(defaultfromTime.getDate() - 31);
    
        this.state = { 
            ...initialState, 
            filters: { 
                toTime: defaulttoTime.getTime(), 
                fromTime: defaultfromTime.getTime(),
            } 
        };        
    }

    componentWillMount() {
        this.props.setTitle('Workouts');
        this.props.fetchWorkouts();
        this.fetchHistory(this.state.filters, 'loadApi');
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleWorkoutClick = (workoutId) => {
        this.navigate('/workouts/' + workoutId)
    }

    handleFiltersChange = (filters) => {

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
                this.props.showSnackbar('Error updating Workout history: ' + error);
                this.setState({ [api]: { isExecuting: false, isErrored: true }});
            })
        })
    }

    render() {
        let workouts = this.props.workouts.concat(this.props.workoutsHistory.workouts);

        return (
            this.state.loadApi.isExecuting ? <Spinner size={48}/> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div style={styles.grid}>
                        <ul>
                            {workouts.map(w => 
                                <li key={w.id}>{w.endTime !== undefined ? 'COMPLETE: ' : w.startTime !== undefined ? 'IN PROGRESS: ' : 'SCHEDULED: '}{w.id}</li>
                            )}
                        </ul>
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
    setTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsCalendar)