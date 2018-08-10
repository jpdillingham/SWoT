import React, { Component } from 'react';

import MDSpinner from 'react-md-spinner';

class Spinner extends Component {
    render() {
        return (
            <MDSpinner
                { ...this.props }
                style={{ ...styles.spinner, ...this.props.style }}
                size={this.props.size ? this.props.size : 35}
            />
        );
    }
}

const styles = {
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
};

export default Spinner;