import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ExerciseDialog from './ExerciseDialog';

const styles = {
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex: 1000
    },
}

class ExerciseAddButton extends Component {
    state = {
        addDialog: {
            open: false
        }
    }

    handleAddClick = () => {
        this.setState({ addDialog: { open: true }})
    }

    handleAddDialogClose = (result) => {
        if (result.added) {
            //this.props.addExercise(result.exercise)
            this.props.showSnackbar('Added exercise \'' + result.exercise.name + '\'')
        }

        this.setState({ addDialog: { open: false }})
    }

    render() {
        return (
            <div>
                <FloatingActionButton 
                    onClick={this.handleAddClick} 
                    secondary={true} 
                    zDepth={4} 
                    style={styles.fab}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <ExerciseDialog 
                    open={this.state.addDialog.open} 
                    intent={'add'}
                    existingNames={this.props.existingNames}
                    addExercise={this.props.addExercise}
                    handleClose={this.handleAddDialogClose}
                />
            </div>
        )
    }
}

export default ExerciseAddButton