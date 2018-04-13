import React, { Component } from 'react';

class Workout extends Component {
    render() {
        console.log(this.props.match.params)

        return (
            <div>
                {this.props.match.params.id}
            </div>
        )
    }
}

export default Workout