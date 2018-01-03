import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { getGuid } from '../../../util'

const styles = {
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex: 1000
    },
}

class ExerciseAddButton extends Component {
    render() {
        return (
            <FloatingActionButton 
                onClick={() => 
                    this.props.addExercise({
                        id: getGuid(),
                        name: prompt('enter name'),
                        type: 'cardio',
                        url: 'url',
                    })
                } 
                secondary={true} 
                zDepth={4} 
                style={styles.fab}
            >
                <ContentAdd />
            </FloatingActionButton>
        )
    }
}

export default ExerciseAddButton

