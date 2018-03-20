import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import AlertWarning from 'material-ui/svg-icons/alert/warning'

import { deleteExercise } from './ExercisesActions'
import { showSnackbar } from '../app/AppActions.js'

const styles = {
    icon: {
        marginRight: 5,
    }
}

class ExerciseDeleteDialog extends Component {
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    handleDeleteClick = () => {
        this.setState({ api: { ...this.state.api, isExecuting: true }})

        this.props.deleteExercise(this.props.exercise.id)
            .then(response => {
                this.props.showSnackbar('Deleted Exercise \'' + this.props.exercise.name + '\'.')
            }, error => {
                let message = 'Error deleting Exercise'
                message += error.response ? ': ' + JSON.stringify(error.response.data).replace(/"/g, "") : '.'
        
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
                    title="Delete Exercise"
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
                    <p>Are you sure you want to delete exercise '{this.props.exercise.name}'?</p>
                    <p><AlertWarning style={styles.icon}/>If this exercise is used in any routines, it will be removed.</p>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    deleteExercise,
    showSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDeleteDialog)

