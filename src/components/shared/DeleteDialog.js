import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

class DeleteDialog extends Component {
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    title={"Delete " + this.props.subject}
                    actions={  
                        <div>          
                            <FlatButton
                                label="Cancel"
                                onClick={this.props.onCancel}
                            />
                            <FlatButton
                                label={this.state.api.isErrored ? 'Retry' : 'Delete' }
                                disabled={this.state.api.isExecuting}
                                onClick={this.props.onDelete}
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                    Are you sure you want to delete {this.props.subject} '{this.props.name}'?
                </Dialog>
            </div>
        )
    }
}

export default DeleteDialog

