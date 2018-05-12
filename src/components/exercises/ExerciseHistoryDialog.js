import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../shared/Spinner'
import { grey300 } from 'material-ui/styles/colors'

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

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
    routine: {
        width: '100%',
    },
    date: {
        width: '100%',
    }
}

const getInitialState = () => ({
    api: {
        isExecuting: false,
        isErrored: false,
    }
})

class ExerciseHistoryDialog extends Component {
    render() {
        let style = this.state.api.isExecuting ? { backgroundColor: grey300 } : {};

        return (
            <Dialog
                bodyStyle={style}
                contentStyle={style}
                titleStyle={style}
                actionsContainerStyle={style}
                title={'Exercise History'} 
                autoScrollBodyContent={true}
                actions={
                    <div>
                        <FlatButton label="Close" onClick={this.handleCancelClick} />
                    </div>
                }
                modal={true}
                open={this.props.open}
                contentStyle={styles.dialogContent}
            >
                {this.state.api.isExecuting? <Spinner /> : ''}
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    workoutsHistory: state.workoutsHistory,
})

const mapDispatchToProps = {
    fetchWorkoutsHistory,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDialog)