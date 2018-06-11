import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchWorkoutsHistory } from '../../workouts/history/WorkoutsHistoryActions';
import { fetchWorkouts } from '../WorkoutsActions';
import { setTitle, showSnackbar } from '../../app/AppActions';

import Spinner from '../../shared/Spinner';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { black, red500, grey300 } from 'material-ui/styles/colors';
import { WORKOUT_AVATAR_COLOR } from '../../../constants'
import Avatar from 'material-ui/Avatar'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ActionEvent } from 'material-ui/svg-icons';
import WorkoutsCalendarEvent from './WorkoutsCalendarEvent';
import WorkoutsCalendarDateCell from './WorkoutsCalendarDateCell';
import WorkoutsCalendarToolbar from './WorkoutsCalendarToolbar';
import AddFloatingAddButton from '../../shared/AddFloatingActionButton';
import WorkoutDialog from '../WorkoutDialog';

const initialState = {
    title: 'Calendar',
    loadApi: {
        isExecuting: false,
        isErrored: false,
    },
    refreshApi: {
        isExecuting: false,
        isErrored: false,
    },
    workoutDialog: {
        open: false,
        date: undefined,
    },
}

const styles = {
    cardHeader: {
        backgroundColor: WORKOUT_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
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
    date: {
        fontSize: 16,
        marginBottom: 15,
        display: 'block',
        fontWeight: 400,
    },
}

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class WorkoutsCalendar extends Component {
    state = initialState;

    componentWillMount() {
        this.props.setTitle('Workouts');

        Promise.all([
            this.props.fetchWorkouts(),
            this.handleUpdate(new Date(), 'month')
        ])
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleWorkoutClick = (workoutId) => {
        this.navigate('/workouts/' + workoutId)
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

    handleSelectEvent = (event) => {
        this.navigate('/workouts/' + event.id)
    }

    handleSelectSlot = (slot) => {
        this.setState({ workoutDialog: { date: slot.start, open: true }});
    }

    handleWorkoutDialogClose = (result) => {
        this.setState({ workoutDialog: { open: false }});
    }

    handleNavigate = (date, view) => {
        this.handleUpdate(date, view);
    }

    handleUpdate = (date, view) => {
        let start, end;

        this.setState({ title: moment(date).format('MMMM YYYY') });

        if(view === 'day'){
          start = moment(date).startOf('day');
          end = moment(date).endOf('day');
        }
        else if(view === 'week'){
          start = moment(date).startOf('isoWeek');
          end = moment(date).endOf('isoWeek');
        }
        else if(view === 'month'){
          start = moment(date).startOf('month').subtract(7, 'days');
          end = moment(date).endOf('month').add(7, 'days');
        }
        else if(view === 'agenda'){
          start = moment(date).startOf('day');
          end = moment(date).endOf('day').add(1, 'month');
        }

        this.fetchHistory({ fromTime: start, toTime: end });
    }

    render() {
        let workoutsHistory = this.props.workoutsHistory && this.props.workoutsHistory.workouts ? this.props.workoutsHistory.workouts : [];
        let workouts = this.props.workouts || [];
        workouts = workouts.concat(workoutsHistory);
        
        workouts = workouts.map(w => { 
            return { 
            id: w.id, 
            title: w.routine.name, 
            start: moment(w.startTime || w.scheduledTime).toDate(), 
            end: moment(w.endTime || w.startTime || w.scheduledTime).toDate(),
            status: w.startTime === undefined ? 'scheduled' : w.endTime === undefined ? 'started' : 'completed'
        }});

        let views = [ 'month' ];

        return (
            
            this.state.loadApi.isExecuting ? <Spinner size={48}/> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div>
                        <Card 
                            zDepth={2}                 
                            style={!this.state.refreshApi.isExecuting ? styles.card : 
                                { 
                                    ...styles.card, 
                                    backgroundColor: grey300 
                                }
                            }
                        >
                            <CardHeader
                                title={'Calendar'}
                                titleStyle={styles.cardTitle}
                                style={styles.cardHeader}
                                avatar={<Avatar backgroundColor={WORKOUT_AVATAR_COLOR} color={black} size={36} icon={<ActionEvent/>}></Avatar>}
                            />
                            <CardText>
                                <span style={styles.date}>{this.state.title}</span>
                                <BigCalendar
                                    selectable
                                    events={workouts}
                                    views={views}
                                    toolbar
                                    popup
                                    step={60}
                                    showMultiDayTimes
                                    defaultDate={new Date()}
                                    style={{height: 500}}
                                    onSelectEvent={this.handleSelectEvent}
                                    onSelectSlot={this.handleSelectSlot}
                                    components={{
                                        eventWrapper: WorkoutsCalendarEvent,
                                        dateCellWrapper: WorkoutsCalendarDateCell,
                                        toolbar: WorkoutsCalendarToolbar,
                                    }}
                                    onNavigate={this.handleNavigate}
                                />
                                {this.state.refreshApi.isExecuting ? <Spinner/> : ''}
                            </CardText>
                        </Card>
                        <WorkoutDialog
                            open={this.state.workoutDialog.open}
                            handleClose={this.handleWorkoutDialogClose}
                            defaultDate={this.state.workoutDialog.date}
                        />
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
    setTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsCalendar)