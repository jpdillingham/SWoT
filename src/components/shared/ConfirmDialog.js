import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

class ConfirmDialog extends Component {
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    handleConfirmClick = () => {
        this.setState({ api: { ...this.state.api, isExecuting: true }}, () => {
            this.props.onConfirm()
            .then(response => { this.props.onClose({ cancelled: false }) }, error => {
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
                                onClick={() => this.props.onClose({ cancelled: true })}
                            />
                            <FlatButton
                                label={this.state.api.isErrored ? 'Retry' : this.props.buttonCaption }
                                disabled={this.state.api.isExecuting}
                                onClick={this.handleConfirmClick}
                            />
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                    {this.props.children}
                </Dialog>
            </div>
        )
    }
}

export default ConfirmDialog

