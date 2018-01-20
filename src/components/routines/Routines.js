import React, { Component } from 'react';
import { connect } from 'react-redux';

class Routines extends Component {
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    render() {
        return (
            <div>
                Routines
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Routines)