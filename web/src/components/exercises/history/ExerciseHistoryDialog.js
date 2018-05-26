import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { addExercise, updateExercise } from '../ExercisesActions'
import { showSnackbar } from '../../app/AppActions.js'
import { grey300 } from 'material-ui/styles/colors'

import Spinner from '../../shared/Spinner'

import { getGuid } from '../../../util';

const styles = {
    name: {
        width: '100%'
    },
    type: {
        width: '100%'
    },
    url: {
        width: '100%'
    },
    dialogContent: {
        width: 400,
    },
    addMetric: {
        float: 'left'
    },
}

const initialState = {
    exercise: {
        id: getGuid(),
        name: '',
        type: '',
        url: '',
        metrics: []
    },
    metricDialog: {
        open: false,
        intent: '',
        metric: {}
    },
    validationErrors: {
        name: '',
        type: '',
        url: '',
    },
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

class ExerciseHistoryDialog extends Component {
    state = initialState

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
        console.log(this.props)
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
                    {this.state.api.isExecuting ? <Spinner/> : ''}
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    existingNames: state.exercises.map(e => e.name)
})

const mapDispatchToProps = {
    addExercise,
    updateExercise,
    showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExerciseHistoryDialog))