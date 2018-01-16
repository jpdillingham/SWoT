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
                this.handleApiError(error);
            })
    }

    handleApiError = (error) => {
        let message = 'Error deleting Exercise'

        if (error.response) {
            message += ': ' + JSON.stringify(error.response.data).replace(/"/g, "")
        }
        else {
            message += '.'
        }

        this.props.showSnackbar(message);
    }

    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              onClick={() => this.props.handleClose()}
            />,
            <FlatButton
              label="Delete"
              onClick={() => this.handleDeleteClick()}
            />,
          ];

        return (
            <div>
                <Dialog
                    title="Delete Exercise"
                    actions={actions}
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

