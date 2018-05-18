import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

class SaveRetryFlatButton extends Component {
    render() {
        return (
            <FlatButton 
                label={this.props.api.isErrored ? 'Retry' : this.props.label ? this.props.label : 'Save'}
                onClick={this.props.onClick} 
                disabled={
                    (Object.keys(this.props.validation)
                        .find(e => this.props.validation[e] !== '') !== undefined) || (this.props.api.isExecuting)
                }
                style={this.props.style}
            />
        )
    }
}

export default SaveRetryFlatButton
