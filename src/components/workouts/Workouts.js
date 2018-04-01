import React, { Component } from 'react';

import {Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import AddFloatingAddButton from '../shared/AddFloatingActionButton'
import WorkoutDialog from './WorkoutDialog';
import ActionDateRange from 'material-ui/svg-icons/action/date-range'
import { black } from 'material-ui/styles/colors'

import { WORKOUT_AVATAR_COLOR } from '../../constants'

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
        width: '390px',
        height: '100%',
        position: 'relative'
    },
    text: {
        /* marginBottom: 40 */
    },
}

class Workouts extends Component {
    render() {
        return (
            <div>
                <Card zDepth={2} style={styles.card}>
                    <CardHeader
                        title={'Past Workouts'}
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        avatar={<Avatar backgroundColor={WORKOUT_AVATAR_COLOR} color={black} size={36} icon={<ActionDateRange/>}></Avatar>}
                    />
                    <CardText style={styles.text}>
                    </CardText>
                </Card>
                <AddFloatingAddButton dialog={<WorkoutDialog/>}/>
            </div>
        )
    }
}

export default Workouts