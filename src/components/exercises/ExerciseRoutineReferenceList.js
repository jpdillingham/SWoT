import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List';

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import { deleteExercise } from './ExercisesActions'
import { fetchRoutines } from '../routines/RoutinesActions'
import { showSnackbar } from '../app/AppActions.js'

const styles = {
    icon: {
        height: 40,
        width: 40,
        margin: 'auto',
        display: 'block',
        top: '10px'
    },
}

class ExerciseRoutineReferenceList extends Component {
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    componentWillMount = () => {
        console.log("mount")
        this.setState({ api: { ...this.state.api, isExecuting: true }})

        this.props.fetchRoutines()
        .then(() => {
            this.setState({ api: { ...this.state.api, isExecuting: false }})
        }, error => {
            this.setState({ api: { isExecuting: false, isErrored: true }})
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("props");

    }

    render() {
        let routines = this.props.routines
                        .filter(r => r.exercises.find(e => e.id === this.props.exercise.id));

        return (
            <div>
                {this.state.api.isExecuting ? <CircularProgress style={styles.icon} /> : 
                    this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                        <div>
                            {routines.length > 0 ? 
                                <div>
                                    <p>This Exercise is used in {routines.length} routine{routines.length === 1 ? '' : 's'}:</p>

                                    <List>
                                        {routines.map(r => 
                                            <ListItem key={r.id} primaryText={r.name} />
                                        )}
                                    </List>

                                    <p>Deleting the Exercise will also delete it from any Routines referencing it.</p>
                                </div>
                            : <p>This Exercise is not used in any Routines.</p>}
                        </div>
                } 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    routines: state.routines,
})

const mapDispatchToProps = {
    fetchRoutines,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseRoutineReferenceList)

