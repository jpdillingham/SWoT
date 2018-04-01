import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoutines } from '../routines/RoutinesActions'

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { showSnackbar } from '../app/AppActions.js'

import { getGuid } from '../../util';

import SaveRetryFlatButton from '../shared/SaveRetryFlatButton';

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
    }
}

const initialState = {
    routine: {
        id: undefined,
    },
    validationErrors: {
        routine: '',
    },
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

class WorkoutDialog extends Component {
    state = initialState

    handleCancelClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }})
        this.props.handleClose()
    }

    handleRoutineChange = (event, index, value) => {
        console.log(event, index, value);
    }

    componentWillReceiveProps = (nextProps) => {
        if (!this.props.open && nextProps.open) {
            this.props.fetchRoutines()
                .then(
                    this.setState(initialState)
                );
        }
    }
    render() {
        return (
            <div>
                <Dialog
                    title={'Add Workout'} 
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <FlatButton label="Cancel" onClick={this.handleCancelClick} />
                            <SaveRetryFlatButton 
                                onClick={this.handleSaveClick} 
                                api={this.state.api} 
                                validation={this.state.validationErrors} 
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                    contentStyle={styles.dialogContent}
                >
                    <SelectField
                        floatingLabelText="Routine"
                        value={this.state.routine.id}
                        onChange={this.handleRoutineChange}
                        style={styles.routine}
                    >
                        {this.props.routines.map(r => 
                            <MenuItem 
                                key={r.id} 
                                value={r.id} 
                                primaryText={r.name}
                            />
                        )}
                    </SelectField>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    routines: state.routines
})

const mapDispatchToProps = {
    showSnackbar,
    fetchRoutines
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDialog)