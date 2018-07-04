import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../../../api';

import { black, red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { sortByProp } from '../../../util'
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem'
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel'

import Spinner from '../../shared/Spinner'

import { fetchExercisesHistory } from './ExercisesHistoryActions'
import { fetchExercises } from '../ExercisesActions'
import { setTitle, showSnackbar } from '../../app/AppActions'

import History from '../../shared/history/History';
import { EXERCISE_AVATAR_COLOR, API_ROOT } from '../../../constants'
import ExercisesHistoryContent from './ExercisesHistoryContent';
import HelpChecklist from '../../help/HelpChecklist';

const initialState = {
    historyExists: false,
    filters: {
        offset: 0,
        limit: 5,
        order: 'desc',
        toTime: undefined,
        fromTime: undefined,
        exerciseId: undefined
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

class ExercisesHistory extends Component {
    constructor(props) {
        super(props);

        let defaultToTime = new Date();
        defaultToTime.setDate(defaultToTime.getDate() + 1);
    
        let defaultFromTime = new Date(defaultToTime);
        defaultFromTime.setDate(defaultFromTime.getDate() - 30);
    
        this.state = { 
            ...initialState, 
            filters: { 
                ...initialState.filters, 
                toTime: defaultToTime.getTime(), 
                fromTime: defaultFromTime.getTime(),
                exerciseId: this.props.match.params.id,
            },
        }; 
    }

    componentWillMount = () => {
        this.props.setTitle('Exercises');

        this.setState({ loadApi: { ...this.state.loadApi, isExecuting: true }}, () => {
            api.get(API_ROOT + '/workouts/history/count')
            .then(response => {
                this.setState({ historyExists: response.data > 0 }, () => {
                    if (this.state.historyExists) {
                        this.fetchHistory(this.state.filters, 'loadApi');
                        this.props.fetchExercises();
                    }
                    else {
                        this.setState({ loadApi: { isExecuting: false, isErrored: false }})
                    }
                });
            })
            .catch(error => {
                this.setState({ loadApi: { isExecuting: false, isErroed: true }})
            })
        })
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    handleItemClick = (id) => {
        this.navigate('/exercises/' + id)
    }

    handleFiltersChange = (filters) => {
        this.fetchHistory({ ...filters, exerciseId: this.state.filters.exerciseId });
    }

    handleCustomFilterChange = (filter, event, index, value) => {
        this.fetchHistory({ ...this.state.filters, offset: 0, exerciseId: value })
    }

    handleCustomFilterClearClick = () => {
        this.fetchHistory({ ...this.state.filters, exerciseId: undefined })
    }

    fetchHistory = (filters, api = 'refreshApi') => {
        this.setState({ 
            [api]: { ...this.state[api], isExecuting: true },
            filters: filters
        }, () => {
            this.props.fetchExercisesHistory(filters)
            .then(response => {
                this.setState({ [api]: { isExecuting: false, isErrored: false }})
            }, error => {
                this.props.showSnackbar('Error fetching Exercise history: ' + error);
                this.setState({ [api]: { isExecuting: false, isErrored: true }})
            });
        });
    }

    render() {
        let history = this.props.exercisesHistory;
        let exercises = history && history.exercises ? history.exercises : undefined;
        exercises = exercises ? exercises.filter(e => e.endTime) : undefined;
        
        let metrics = !exercises ? undefined : exercises.map(e => e.metrics);
        metrics = !metrics || metrics.length === 0 ? [] : metrics
                                    .reduce((acc, e) => acc.concat(e))
                                    .sort(sortByProp('name'))
                                    .filter((value, index, array) => index > 0 ? value.name !== array[index - 1].name : true);

        return (
            this.state.loadApi.isExecuting ? <Spinner size={48}/> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    !this.state.historyExists ? <HelpChecklist/> :
                        <div style={styles.grid}>
                            <History
                                title={'History'}
                                color={EXERCISE_AVATAR_COLOR}
                                data={this.props.exercisesHistory.exercises}
                                total={this.props.exercisesHistory.totalCount}
                                refreshing={this.state.refreshApi.isExecuting}
                                defaultFilters={this.state.filters}
                                onFilterChange={this.handleFiltersChange}
                                customFilters={
                                    <span>
                                        <SelectField 
                                            floatingLabelText={'Filter By'}
                                            style={styles.exercise} 
                                            value={this.state.filters.exerciseId} 
                                            onChange={(event, index, value) => this.handleCustomFilterChange('exerciseId', event, index, value)}
                                            disabled={this.state.refreshApi.isExecuting}
                                        >
                                            {this.props.exercises.map((e, index) => 
                                                <MenuItem 
                                                    key={index} 
                                                    value={e.id} 
                                                    primaryText={e.name} 
                                                />                    
                                            )}
                                            {!this.state.filters.exerciseId || this.props.exercises.find(e => e.id === this.state.filters.exerciseId) ? '' :
                                                <MenuItem key={-1} value={this.state.filters.exerciseId} primaryText={'Invalid Exercise Id'}/>
                                            }
                                        </SelectField>
                                        {this.state.filters.exerciseId ? 
                                            <NavigationCancel style={styles.clearIcon} onClick={this.handleCustomFilterClearClick}/>
                                        : '' }
                                    </span>
                                }
                            >
                                <ExercisesHistoryContent
                                    metrics={metrics}
                                    exercisesHistory={this.props.exercisesHistory}
                                    filters={this.state.filters}
                                    refreshing={this.state.refreshApi.isExecuting}
                                />
                            </History>
                        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    exercisesHistory: state.exercisesHistory,
    exercises: state.exercises
})

const mapDispatchToProps = {
    fetchExercisesHistory,
    fetchExercises,
    showSnackbar,
    setTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesHistory)