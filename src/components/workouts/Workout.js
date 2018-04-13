import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWorkouts } from '../workouts/WorkoutsActions'

const initialState = {
    workout: undefined,
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

class Workout extends Component {
    state = initialState;

    componentWillMount = () => {
        this.setState({ api: { ...this.state.api, isExecuting: true }})
        
        this.props.fetchWorkouts()
            .then(response => {
                this.setState({ 
                    workout: this.props.workouts.find(w => w.id === this.props.match.params.id),
                    api: { isExecuting: false, isErrored: false }
                })
            }, error => {
                this.setState({ api: { isExecuting: false, isErrored: true }})
            })
    }

    render() {
        return (
            <div>
                {this.state.workout === undefined ? 
                    <span>Invalid Workout Id.</span> : 
                    <div>
                        <span>{this.state.workout.endTime === undefined ? 'ACTIVE' : 'COMPLETE'}</span>
                        {JSON.stringify(this.state.workout)}
                    </div>
                }
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