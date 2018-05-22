import React, { Component } from 'react';
import { connect } from 'react-redux';

import { black, red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'

import ActionRestore from 'material-ui/svg-icons/action/restore'
import ActionInfo from 'material-ui/svg-icons/action/info'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ContentClear from 'material-ui/svg-icons/content/clear'

import Spinner from '../../shared/Spinner'

import History from '../../shared/history/History';
import { EXERCISE_AVATAR_COLOR } from '../../../constants'

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

    componentWillMount() {
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleWorkoutClick = (workoutId) => {
        this.navigate('/workouts/' + workoutId)
    }

    handleNextClick = () => {

    }

    handleFiltersChange = (filters) => {
        let routineChanged = this.state.filters.routineId !== filters.routineId;
        let fromDateChanged = this.state.filters.fromDate !== filters.fromDate;
        let toDateChanged = this.state.filters.toDate !== filters.toDate;

        if (routineChanged || fromDateChanged || toDateChanged) {
            filters.offset = 0;
        }

    }

    handlePreviousClick = () => {
 
    }


    render() {
        let filters = this.state.filters;
        let start;
        let end;       


        return (
            this.state.loadApi.isExecuting ? <Spinner size={48}/> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div style={styles.grid}>
                        <History
                            title={'History'}
                            color={EXERCISE_AVATAR_COLOR}
                        >
                            hello world! 
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesHistory)