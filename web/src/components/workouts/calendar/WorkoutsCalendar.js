import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchWorkoutsHistory } from '../../workouts/history/WorkoutsHistoryActions';
import { fetchWorkouts } from '../WorkoutsActions';
import { setTitle, showSnackbar } from '../../app/AppActions';

import Spinner from '../../shared/Spinner';

import { red500 } from 'material-ui/styles/colors';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

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

        let events = [
            {
              id: 0,
              title: 'All Day Event very long title',
              allDay: true,
              start: new Date(2015, 3, 0),
              end: new Date(2015, 3, 1),
            },
            {
              id: 1,
              title: 'Long Event',
              start: new Date(2015, 3, 7),
              end: new Date(2015, 3, 10),
            },
          
            {
              id: 2,
              title: 'DTS STARTS',
              start: new Date(2016, 2, 13, 0, 0, 0),
              end: new Date(2016, 2, 20, 0, 0, 0),
            },
          
            {
              id: 3,
              title: 'DTS ENDS',
              start: new Date(2016, 10, 6, 0, 0, 0),
              end: new Date(2016, 10, 13, 0, 0, 0),
            },
          
            {
              id: 4,
              title: 'Some Event',
              start: new Date(2015, 3, 9, 0, 0, 0),
              end: new Date(2015, 3, 9, 0, 0, 0),
            },
            {
              id: 5,
              title: 'Conference',
              start: new Date(2015, 3, 11),
              end: new Date(2015, 3, 13),
              desc: 'Big conference for important people',
            },
            {
              id: 6,
              title: 'Meeting',
              start: new Date(2015, 3, 12, 10, 30, 0, 0),
              end: new Date(2015, 3, 12, 12, 30, 0, 0),
              desc: 'Pre-meeting meeting, to prepare for the meeting',
            },
            {
              id: 7,
              title: 'Lunch',
              start: new Date(2015, 3, 12, 12, 0, 0, 0),
              end: new Date(2015, 3, 12, 13, 0, 0, 0),
              desc: 'Power lunch',
            },
            {
              id: 8,
              title: 'Meeting',
              start: new Date(2015, 3, 12, 14, 0, 0, 0),
              end: new Date(2015, 3, 12, 15, 0, 0, 0),
            },
            {
              id: 9,
              title: 'Happy Hour',
              start: new Date(2015, 3, 12, 17, 0, 0, 0),
              end: new Date(2015, 3, 12, 17, 30, 0, 0),
              desc: 'Most important meal of the day',
            },
            {
              id: 10,
              title: 'Dinner',
              start: new Date(2015, 3, 12, 20, 0, 0, 0),
              end: new Date(2015, 3, 12, 21, 0, 0, 0),
            },
            {
              id: 11,
              title: 'Birthday Party',
              start: new Date(2015, 3, 13, 7, 0, 0),
              end: new Date(2015, 3, 13, 10, 30, 0),
            },
            {
              id: 12,
              title: 'Late Night Event',
              start: new Date(2015, 3, 17, 19, 30, 0),
              end: new Date(2015, 3, 18, 2, 0, 0),
            },
            {
              id: 13,
              title: 'Multi-day Event',
              start: new Date(2015, 3, 20, 19, 30, 0),
              end: new Date(2015, 3, 22, 2, 0, 0),
            },
            {
              id: 14,
              title: 'Today',
              start: new Date(new Date().setHours(new Date().getHours() - 3)),
              end: new Date(new Date().setHours(new Date().getHours() + 3)),
            },
          ]
        
          let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

        return (
            this.state.loadApi.isExecuting ? <Spinner size={48}/> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <BigCalendar
                        events={events}
                        views={allViews}
                        step={60}
                        showMultiDayTimes
                        defaultDate={new Date(2015, 3, 1)}
                    />
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