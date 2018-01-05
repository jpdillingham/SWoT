import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { EXERCISE_TYPES, EXERCISE_URL_BASE } from '../../../constants'
import { getGuid } from '../../../util'

const styles = {
    name: {
        width: '100%'
    },
    type: {
        width: '100%'
    },
    url: {
        width: '100%'
    },
    dialog: {
        width: 400
    }
}

class ExerciseAddDialog extends Component {
    state = {
        exercise: {
            id: getGuid(),
            name: '',
            type: '',
            url: '',
            metrics: [
            ]
        }
    }

    handleTypeChange = (event, index, value) => {
        this.setState(prevState => ({ 
            exercise: { ...prevState.exercise, type: value } 
        }))
    }

    handleNameChange = (event, value) => {
        this.setState(prevState => ({
            exercise: { ...prevState.exercise, name: value }
        }))
    }

    handleUrlChange = (event, value) => {
        this.setState(prevState => ({
            exercise: { ...prevState.exercise, url: EXERCISE_URL_BASE + value }
        }))
    }

    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={() => this.props.handleClose({ cancelled: true })}
            />,
            <FlatButton
              label="Add"
              primary={true}
              onClick={() => this.props.handleClose({ added: true, exercise: this.state.exercise })}
            />,
          ];

        return (
            <div>
                <Dialog
                    title="Add Exercise"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    contentStyle={styles.dialog}
                >
                    <TextField
                        hintText="e.g. 'Bench Press'"
                        floatingLabelText="Name"
                        style={styles.name}
                        onChange={this.handleNameChange}
                    /><br />
                    <SelectField
                        floatingLabelText="Type"
                        value={this.state.exercise.type}
                        onChange={this.handleTypeChange}
                        style={styles.type}
                    >
                        {EXERCISE_TYPES.map(e => <MenuItem value={e} primaryText={e}/>)}
                    </SelectField><br/>
                    <TextField
                        hintText="e.g. '/barbell-bench-press-medium-grip'"
                        floatingLabelText="Bodybuilding.com Url"
                        style={styles.url}
                        onChange={this.handleUrlChange}
                    /><br />
                </Dialog>
            </div>
        )
    }
}

export default ExerciseAddDialog

