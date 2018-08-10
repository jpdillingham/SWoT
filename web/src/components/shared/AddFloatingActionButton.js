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
        zIndex: 1000,
    },
};

const initialState = {
    addDialog: {
        open: false,
    },
};

class AddFloatingActionButton extends Component {
    state = initialState;

    componentDidMount = () => {
        if (this.props.startOpen) {
            this.setState({ addDialog: { open: true }});
        }
    }

    handleAddClick = () => {
        this.setState({ addDialog: { open: true }});
    }

    handleAddDialogClose = (result) => {
        this.setState({ addDialog: { open: false }});
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
                
                {React.cloneElement(this.props.dialog, { 
                    open: this.state.addDialog.open, 
                    handleClose: this.handleAddDialogClose, 
                })}
            </div>
        );
    }
}

export default AddFloatingActionButton;