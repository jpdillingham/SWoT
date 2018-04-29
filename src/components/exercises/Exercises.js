import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchExercises, deleteExercise } from './ExercisesActions'
import { showSnackbar } from '../app/AppActions'

import ExerciseCard from './ExerciseCard'

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import AddFloatingActionButton from '../shared/AddFloatingActionButton'
import ExerciseDialog from './ExerciseDialog'

import { CARD_WIDTH, INTENTS } from '../../constants'

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
        gridTemplateColumns: 'repeat(auto-fit, ' + CARD_WIDTH + 'px)'
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
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    handleExerciseDelete = (exercise) => {
        return new Promise((resolve, reject) => {
            this.props.deleteExercise(exercise.id)
            .then(response => {
                this.props.showSnackbar('Deleted Exercise \'' + exercise.name + '\'.')
                resolve(response);
            }, error => {
                let message = 'Error deleting Exercise'
                message += error.response ? ': ' + JSON.stringify(error.exercise.data).replace(/"/g, "") : '.'

                this.props.showSnackbar(message);
                reject(error);
            })
        });
    }

    componentWillMount() {
        this.setState({ api: { ...this.state.api, isExecuting: true }})

        this.props.fetchExercises()
        .then(response => {
            this.setState({ api: { isExecuting: false, isErrored: false }})
        }, error => {
            this.setState({ api: { isExecuting: false, isErrored: true }})
        })
    }

    render() {
        return (
            this.state.api.isExecuting ? <CircularProgress style={styles.icon} /> : 
                this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div>
                        <div style={styles.grid}>
                            {this.props.exercises.map(e =>  
                                <ExerciseCard 
                                    key={e.id}
                                    exercise={e} 
                                    onDelete={() => this.handleExerciseDelete(e)}
                                />
                            )}
                        </div>
                        <AddFloatingActionButton dialog={<ExerciseDialog intent={INTENTS.ADD} />} />
                    </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    exercises: state.exercises
})

const mapDispatchToProps = {
    fetchExercises,
    deleteExercise,
    showSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercises)