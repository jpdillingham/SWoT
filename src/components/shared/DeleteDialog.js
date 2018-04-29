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

    handleDeleteClick = () => {
        this.setState({ api: { ...this.state.api, isExecuting: true }}, () => {
            this.props.onDelete()
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }});
            }, error => {
                this.setState({ api: { isExecuting: false, isErrored: true }});
            })
        })
    }

    render() {
        return (
            <div>
                <Dialog
                    title={this.props.title}
                    actions={  
                        <div>          
                            <FlatButton
                                label="Cancel"
                                onClick={this.props.onCancel}
                            />
                            <FlatButton
                                label={this.state.api.isErrored ? 'Retry' : 'Delete' }
                                disabled={this.state.api.isExecuting}
                                onClick={this.handleDeleteClick}
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                    {this.props.prompt}
                </Dialog>
            </div>
        )
    }
}

export default DeleteDialog

