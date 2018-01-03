import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

const styles = {

}

class ExerciseDeleteDialog extends Component {
    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={() => this.props.handleClose(false)}
            />,
            <FlatButton
              label="Delete"
              primary={true}
              disabled={false}
              onClick={() => this.props.handleClose(true)}
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

