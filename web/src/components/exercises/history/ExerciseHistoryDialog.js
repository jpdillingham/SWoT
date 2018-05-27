import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { fetchExercisesHistory, clearExercisesHistory } from './ExercisesHistoryActions'
import { showSnackbar } from '../../app/AppActions.js'
import { grey300 } from 'material-ui/styles/colors'
import ExercisesHistoryContent from './ExercisesHistoryContent'

import Spinner from '../../shared/Spinner'

import { sortByProp } from '../../../util';

const styles = {
    dialogContent: {
        minWidth: 400,
        width: '100%',
        maxWidth: 'none'
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
        order: 'desc',
        exerciseId: undefined,
    }
}

class ExerciseHistoryDialog extends Component {
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
                this.setState({ api: { isExecuting: false, isErrored: true }})
            })
        })
    }

    handleCloseClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }})
        this.props.onClose()
    }

    handleViewFullHistoryClick = () => {
        this.navigate('/exercises/history/' + this.props.exercise.id);
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    render() {
        let history = this.props.exercisesHistory;
        let exercises = history && history.exercises ? history.exercises : undefined;
        let metrics = !exercises ? undefined : exercises.map(e => e.metrics);
        metrics = !metrics || metrics.length === 0 ? [] : metrics
                                    .reduce((acc, e) => acc.concat(e))
                                    .sort(sortByProp('name'))
                                    .filter((value, index, array) => index > 0 ? value.name !== array[index - 1].name : true);
                                    
        let refreshStyle = this.state.api.isExecuting ? { backgroundColor: grey300 } : {};

        return (
            <div>
                <Dialog
                    bodyStyle={refreshStyle}
                    actionsContainerStyle={refreshStyle}
                    titleStyle={refreshStyle}
                    contentStyle={{ ...styles.dialogContent, refreshStyle }}
                    title={this.props.exercise.name + ' History'} 
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <FlatButton 
                                label="View Full history" 
                                onClick={this.handleViewFullHistoryClick} 
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
                        <ExercisesHistoryContent
                            metrics={metrics}
                            exercisesHistory={this.props.exercisesHistory}
                            hideName={true}
                            filters={this.state.filters}
                            refreshing={this.state.api.isExecuting}
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
    clearExercisesHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExerciseHistoryDialog))