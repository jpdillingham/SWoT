import React, { Component } from 'react';

import { Card, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'
import ActionRestore from 'material-ui/svg-icons/action/restore'
import { black } from 'material-ui/styles/colors'

import { WORKOUT_AVATAR_COLOR } from '../../constants'
import WorkoutCard from './WorkoutCard';

const styles = {
    cardHeader: {
        backgroundColor: WORKOUT_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
}

class WorkoutResumeCard extends Component {
    render() {
        return (
            <div>
                <Card zDepth={2} style={styles.card}>
                    <CardHeader
                        title={'Resume Workout'}
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        avatar={<Avatar backgroundColor={WORKOUT_AVATAR_COLOR} color={black} size={36} icon={<ActionRestore/>}></Avatar>}
                    />
                    {this.props.workouts.map(w => 
                        <WorkoutCard 
                            key={w.id}
                            workout={w}
                        />
                    )}
                </Card>
            </div>
        )
    }
}

export default WorkoutResumeCard