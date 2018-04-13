import React, { Component } from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => ({
    workouts: state.workouts
})

const mapDispatchToProps = {
    fetchWorkouts
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)