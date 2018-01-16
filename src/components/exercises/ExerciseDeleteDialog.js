import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import { deleteExercise, cancelDeleteExercise } from './ExercisesActions'
import { showSnackbar } from '../app/AppActions.js'

class ExerciseDeleteDialog extends Component {
    handleDeleteClick = () => {
        this.props.deleteExercise(this.props.exercise.id)
            .then((response) => {
                this.props.showSnackbar('Deleted Exercise \'' + this.props.exercise.name + '\'.')
                this.props.handleClose();
            }, (error) => {
                let message = 'Error deleting Exercise'

                if (error.response) {
                    message += ': ' + JSON.stringify(error.response.data).replace(/"/g, "")
                }
                else {
                    message += '.'
                }
        
                this.props.showSnackbar(message);
            })
    }

    handleCancelClick = () => {
        this.props.cancelDeleteExercise();
        this.props.handleClose();
    }

    render() {
        return (
            <div>
                <Dialog
                    title="Delete Exercise"
                    actions={  
                        <div>          
                            <FlatButton
                                label="Cancel"
                                onClick={() => this.handleCancelClick()}
                            />
                            <FlatButton
                                label={this.props.api.delete.isErrored ? 'Retry' : 'Delete' }
                                disabled={this.props.api.delete.isExecuting}
                                onClick={() => this.handleDeleteClick()}
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                    Are you sure you want to delete exercise '{this.props.exercise.name}'?
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    api: state.exercises.api
})

const mapDispatchToProps = {
    deleteExercise,
    cancelDeleteExercise,
    showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDeleteDialog)

