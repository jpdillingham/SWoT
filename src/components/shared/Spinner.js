import React, { Component } from 'react';

import MDSpinner from 'react-md-spinner';

class Spinner extends Component {
    render() {
        return (
            <MDSpinner
                style={{ ...styles.spinner, ...this.props.style }}
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
}

export default Spinner;