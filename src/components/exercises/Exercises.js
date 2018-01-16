import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchExercises } from './ExercisesActions'

import ExercizeCard from './ExerciseCard'
import ExerciseAddButton from './ExerciseAddButton'

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
        gridTemplateColumns: 'repeat(auto-fit, 400px)'
    },
    icon: {
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

class Exercises extends Component {
    componentWillMount() {
        this.props.fetchExercises();
    }

    render() {
        return (
            <div>
                <ExerciseAddButton />
                { 
                    this.props.exercises.api.get.isExecuting ? <CircularProgress style={styles.icon} /> : 
                        this.props.exercises.api.get.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                            <div style={styles.grid}>
                                {this.props.exercises.items.map(e =>  
                                    <div key={e.id}>
                                        <ExercizeCard exercise={e} />
                                    </div>
                                )}
                            </div>
                }
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    exercises: state.exercises
})

const mapDispatchToProps = {
    fetchExercises,
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercises)