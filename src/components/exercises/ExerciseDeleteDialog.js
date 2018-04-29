import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List';

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { deleteExercise } from './ExercisesActions'
import { fetchRoutines } from '../routines/RoutinesActions'
import { showSnackbar } from '../app/AppActions.js'

const styles = {
    icon: {
        height: 24,
        width: 24,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

class ExerciseDeleteDialog extends Component {
    state = {
        deleteApi: {
            isExecuting: false,
            isErrored: false,
        },
        fetchApi: {
            isExecuting: false,
            isErrored: false,
        }
    }

    handleDeleteClick = () => {
        this.setState({ deleteApi: { ...this.state.deleteApi, isExecuting: true }})

        this.props.deleteExercise(this.props.exercise.id)
            .then(response => {
                this.props.showSnackbar('Deleted Exercise \'' + this.props.exercise.name + '\'.')
            }, error => {
                let message = 'Error deleting Exercise'
                message += error.response ? ': ' + JSON.stringify(error.response.data).replace(/"/g, "") : '.'
        
                this.setState({ deleteApi: { isExecuting: false, isErrored: true }})
                this.props.showSnackbar(message);
            })
    }

    handleCancelClick = () => {
        this.setState({ deleteApi: { isExecuting: false, isErrored: false }})
        this.props.handleClose();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.open && nextProps.open) {
            this.setState({ fetchApi: { ...this.state.fetchApi, isExecuting: true }})

            this.props.fetchRoutines()
            .then(() => {
                this.setState({ fetchApi: { ...this.state.fetchApi, isExecuting: false }})
            }, error => {
                this.setState({ fetchApi: { isExecuting: false, isErrored: true }})
            })
        }
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
                                label={this.state.deleteApi.isErrored ? 'Retry' : 'Delete' }
                                disabled={this.state.deleteApi.isExecuting}
                                onClick={() => this.handleDeleteClick()}
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                {this.state.fetchApi.isExecuting ? <CircularProgress style={styles.icon} /> : 
                    this.state.fetchApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                        <div>
                            <p>Are you sure you want to delete exercise '{this.props.exercise.name}'?</p>

                            {routines.length > 0 ? 
                                <div>
                                    <p>This exercise is used in {routines.length} routine{routines.length === 1 ? '' : 's'}:</p>

                                    <List>
                                        {routines.map(r => 
                                            <ListItem key={r.id} primaryText={r.name} />
                                        )}
                                    </List>
                                </div>
                            : ''}
                        </div>} 
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

