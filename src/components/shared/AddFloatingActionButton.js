import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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

class AddFloatingActionButton extends Component {
    state = {
        addDialog: {
            open: false
        }
    }

    handleAddClick = () => {
        this.setState({ addDialog: { open: true }})
    }

    handleAddDialogClose = (result) => {
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

                // TODO: inject event handlers and open variable
                {this.props.dialog}
            </div>
        )
    }
}

export default AddFloatingActionButton