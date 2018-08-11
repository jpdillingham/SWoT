import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { grey300 } from 'material-ui/styles/colors';

import RoutineHistoryDialogContent from './RoutineHistoryDialogContent';
import { fetchWorkoutsHistory, clearWorkoutsHistory } from '../../workouts/history/WorkoutsHistoryActions';
import Spinner from '../../shared/Spinner';
import { showSnackbar } from '../../app/AppActions';

const styles = {
    dialogContent: {
        width: 400,
    },
};

const initialState = {
    api: {
        isExecuting: false,
        isErrored: false,
    },
    filters: {
        offset: 0,
        limit: 10,
        order: 'desc',
        routineId: undefined,
    },
};

class RoutineHistoryDialog extends Component {
    state = initialState

    componentWillReceiveProps = (nextProps) => {
        if (!this.props.open && nextProps.open) {
            this.props.clearWorkoutsHistory().then(() => {
                this.fetchHistory({ ...this.state.filters, routineId: nextProps.routine.id });
            });
        }
    }

    fetchHistory = (filters) => {
        this.setState({ 
            api: { ...this.state.api, isExecuting: true },
            filters: { ...filters, routineId: this.props.routine.id },
        }, () => {
            this.props.fetchWorkoutsHistory(filters)
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }});
            }, error => {
                this.props.showSnackbar('Error fetching Workout history: ' + error);
                this.setState({ api: { isExecuting: false, isErrored: true }});
            });
        });
    }

    handleCloseClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }});
        this.props.onClose();
    }

    handleViewFullHistoryClick = () => {
        this.navigate('/workouts/history/' + this.props.routine.id);
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    render() {
        let refreshStyle = this.state.api.isExecuting ? { backgroundColor: grey300 } : {};

        return (
            <div>
                <Dialog
                    bodyStyle={refreshStyle}
                    actionsContainerStyle={refreshStyle}
                    titleStyle={refreshStyle}
                    contentStyle={{ ...styles.dialogContent, refreshStyle }}
                    title={this.props.routine.name + ' History'} 
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
                    {!this.props.workoutsHistory ? '' : 
                        <RoutineHistoryDialogContent
                            routine={this.props.routine}
                            history={this.props.workoutsHistory}
                            filters={this.state.filters}
                            refreshing={this.state.api.isExecuting}
                        />
                    }
                    {this.state.api.isExecuting ? <Spinner/> : ''}
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    workoutsHistory: state.workoutsHistory,
});

const mapDispatchToProps = {
    fetchWorkoutsHistory,
    clearWorkoutsHistory,
    showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoutineHistoryDialog));