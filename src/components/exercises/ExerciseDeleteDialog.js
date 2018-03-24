import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List';

import { deleteExercise } from './ExercisesActions'
import { fetchRoutines } from '../routines/RoutinesActions'
import { showSnackbar } from '../app/AppActions.js'

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

    componentWillMount() {
        this.props.fetchRoutines();
    }

    render() {
        let routines = this.props.routines
                        .filter(r => r.exercises.find(e => e.id === this.props.exercise.id));

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

                    {routines.length > 0 ? 
                        <div>
                            <p>This exercise is used in {routines.length} routine{routines.length === 1 ? '' : 's'}:</p>

                            <List>
                                {routines.map(r => 
                                    <ListItem key={r.id} primaryText={r.name} />
                                )}
                            </List>

                            <p>Deleting the exercise will also delete it from any routines referencing it.</p>
                        </div>
                    : ''}
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    routines: state.routines,
})

const mapDispatchToProps = {
    deleteExercise,
    showSnackbar,
    fetchRoutines,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDeleteDialog)

