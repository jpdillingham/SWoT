import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { grey300 } from 'material-ui/styles/colors'

import ExerciseHistoryDialogContent from './ExerciseHistoryDialogContent'
import { fetchExercisesHistory, clearExercisesHistory } from './ExercisesHistoryActions'
import Spinner from '../../shared/Spinner'
import { showSnackbar } from '../../app/AppActions'

import { Line } from 'react-chartjs-2';
import { sortByProp } from '../../../util';

const styles = {
    dialogContent: {
        width: 400,
    },
}

const initialState = {
    api: {
        isExecuting: false,
        isErrored: false,
    },
    filters: {
        offset: 0,
        limit: 10,
        order: 'asc',
        exerciseId: undefined,
    }
}

class ExerciseProgressDialog extends Component {
    state = initialState

    componentWillReceiveProps = (nextProps) => {
        if (!this.props.open && nextProps.open) {
            this.props.clearExercisesHistory().then(() => {
                this.fetchHistory({ ...this.state.filters, exerciseId: nextProps.exercise.id });
            })
        }
    }

    fetchHistory = (filters) => {
        this.setState({ 
            api: { ...this.state.api, isExecuting: true },
            filters: { ...filters, exerciseId: this.props.exercise.id }
        }, () => {
            this.props.fetchExercisesHistory(filters)
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }})
            }, error => {
                this.props.showSnackbar('Error fetching Exercise history: ' + error);
                this.setState({ api: { isExecuting: false, isErrored: true }});
            })
        })
    }

    handleCloseClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }})
        this.props.onClose()
    }

    handleViewFullProgressClick = () => {
        this.navigate('/exercises/progress/' + this.props.exercise.id);
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    getDistinctMetrics = (exercises) => {
        let metrics = !exercises ? undefined : exercises.map(e => e.metrics);
        return !metrics || metrics.length === 0 ? [] : metrics
            .reduce((acc, e) => acc.concat(e))
            .sort(sortByProp('name'))
            .filter((value, index, array) => index > 0 ? value.name !== array[index - 1].name : true)
            .map(m => { return { name: m.name, uom: m.uom }});
    }

    getDatasets = (exercises) => {
        let datasets = this.getDistinctMetrics(exercises)
            .reduce((acc, m) => acc.concat({ label: m.name, data: [] }), []);

        exercises.forEach(e => datasets = e.metrics.reduce((acc, m) => { 
                var set = acc.find(s => s.label === m.name);
                set.data = set.data.concat(m.value);
                acc[acc.indexOf(set)] = set;
                return acc
            }, datasets))
        
        return datasets;
    }

    render() {
        let refreshStyle = this.state.api.isExecuting ? { backgroundColor: grey300 } : {};

        let history = this.props.exercisesHistory;
        let exercises = history && history.exercises ? history.exercises : [];

        let chartData = {
            labels: exercises.map(e => moment(e.endTime).format('l')),
            datasets: this.getDatasets(exercises),
        };

        return (
            <div>
                <Dialog
                    bodyStyle={refreshStyle}
                    actionsContainerStyle={refreshStyle}
                    titleStyle={refreshStyle}
                    contentStyle={{ ...styles.dialogContent, refreshStyle }}
                    title={this.props.exercise.name + ' Progress'} 
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <FlatButton 
                                label="View Full progress" 
                                onClick={this.handleViewFullProgressClick} 
                                disabled={this.state.api.isExecuting}
                            />
                            <FlatButton 
                                label="Close" 
                                onClick={this.handleCloseClick} 
                                disabled={this.state.api.isExecuting}
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                    {!this.props.exercisesHistory ? '' : 
                        <Line 
                            height={window.innerHeight - 410}
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    }
                    {this.state.api.isExecuting ? <Spinner/> : ''}
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    exercisesHistory: state.exercisesHistory
})

const mapDispatchToProps = {
    fetchExercisesHistory,
    clearExercisesHistory,
    showSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExerciseProgressDialog))