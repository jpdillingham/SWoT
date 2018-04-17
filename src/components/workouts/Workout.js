import React, { Component } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { fetchWorkouts } from '../workouts/WorkoutsActions'

const initialState = {
    workout: undefined,
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

const styles = {
    icon: {
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
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
                { 
                    this.state.api.isExecuting ? <CircularProgress style={styles.icon} /> : 
                        this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                            this.state.workout === undefined ? <span>Invalid Workout Id.</span> : 
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