import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ExerciseAddDialog from '../ExerciseAddDialog'

import { getGuid } from '../../../util'

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
        addDialogOpen: false
    }

    handleAddClick = () => {
        this.setState({ addDialogOpen: true })
    }

    handleAddDialogClose = (result) => {
        if (result.added) {
            console.log(result.exercise)
            this.props.addExercise(result.exercise)
            this.props.showSnackbar('Added exercise \'' + result.exercise.name + '\'')
        }

        this.setState({ addDialogOpen: false })
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
                <ExerciseAddDialog 
                    open={this.state.addDialogOpen} 
                    handleClose={this.handleAddDialogClose}
                />
            </div>
        )
    }
}

export default ExerciseAddButton

