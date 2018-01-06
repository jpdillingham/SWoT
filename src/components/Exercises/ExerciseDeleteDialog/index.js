import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

class ExerciseDeleteDialog extends Component {
    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              onClick={() => this.props.handleClose({ cancelled: true })}
            />,
            <FlatButton
              label="Delete"
              onClick={() => this.props.handleClose({ deleted: true })}
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

export default ExerciseDeleteDialog

