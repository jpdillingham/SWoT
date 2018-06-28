import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoutines, deleteRoutine } from './RoutinesActions'
import { fetchExercises } from '../exercises/ExercisesActions'
import { setTitle, showSnackbar } from '../app/AppActions'

import { red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import RoutineCard from './RoutineCard'
import Spinner from '../shared/Spinner'

import AddFloatingActionButton from '../shared/AddFloatingActionButton'
import { CARD_WIDTH, INTENTS } from '../../constants'
import RoutineDialog from './RoutineDialog';
import HelpChecklist from '../help/HelpChecklist';

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

class Routines extends Component {
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    componentWillMount() {
        this.props.setTitle('Routines');
        this.setState({ api: { ...this.state.api, isExecuting: true }})

        Promise.all([
            this.props.fetchExercises(),
            this.props.fetchRoutines(),
        ])
        .then(response => {
            this.setState({ api: { isExecuting: false, isErrored: false }})
        }, error => {
            this.props.showSnackbar('Error fetching Routines: ' + error);
            this.setState({ api: { isExecuting: false, isErrored: true }})
        })
    }

    handleRoutineDelete = (routine) => {
        return new Promise((resolve, reject) => {
            this.props.deleteRoutine(routine.id)
            .then(response => {
                this.props.showSnackbar('Deleted Routine \'' + routine.name + '\'.')
                resolve(response);
            }, error => {
                this.props.showSnackbar('Error deleting Routine \'' + routine.name + '\': ' + error);
                reject(error);
            })
        })
    }

    render() {
        return (
            this.state.api.isExecuting ? <Spinner size={48}/> : 
                this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    !this.props.routines.length && !this.props.exercises.length ? <HelpChecklist/> :
                        <div>
                            <div style={styles.grid}>
                                {this.props.routines.map(r =>  
                                    <RoutineCard 
                                        key={r.id} 
                                        routine={r} 
                                        onDelete={() => this.handleRoutineDelete(r)}
                                    />
                                )}
                            </div>
                            <AddFloatingActionButton 
                                startOpen={this.props.exercises.length && !this.props.routines.length}
                                dialog={<RoutineDialog intent={INTENTS.ADD} />} 
                            />
                        </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    exercises: state.exercises,
    routines: state.routines,
})

const mapDispatchToProps = {
    fetchExercises,
    fetchRoutines,
    deleteRoutine,
    showSnackbar,
    setTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(Routines)