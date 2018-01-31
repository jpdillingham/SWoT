import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import { deleteRoutine } from './RoutinesActions'
import { showSnackbar } from '../app/AppActions.js'

class RoutineDeleteDialog extends Component {
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    handleDeleteClick = () => {
        this.setState({ api: { ...this.state.api, isExecuting: true }})

        this.props.deleteRoutine(this.props.routine.id)
            .then(response => {
                this.props.showSnackbar('Deleted Routine \'' + this.props.routine.name + '\'.')
            }, error => {
                let message = 'Error deleting Routine'
                message += error.response ? ': ' + JSON.stringify(error.routine.data).replace(/"/g, "") : '.'
        
                this.setState({ api: { isExecuting: false, isErrored: true }})
                this.props.showSnackbar(message);
            })
    }

    handleCancelClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }})
        this.props.handleClose();
    }

    render() {
        return (
            <div>
                <Dialog
                    title="Delete Routine"
                    actions={  
                        <div>          
                            <FlatButton
                                label="Cancel"
                                onClick={() => this.handleCancelClick()}
                            />
                            <FlatButton
                                label={this.state.api.isErrored ? 'Retry' : 'Delete' }
                                disabled={this.state.api.isExecuting}
                                onClick={() => this.handleDeleteClick()}
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                    Are you sure you want to delete routine '{this.props.routine.name}'?
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    deleteRoutine,
    showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDeleteDialog)

