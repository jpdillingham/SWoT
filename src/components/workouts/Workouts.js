import React, { Component } from 'react';

import {Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'
import AddFloatingAddButton from '../shared/AddFloatingActionButton'
import WorkoutDialog from './WorkoutDialog';
import ActionDateRange from 'material-ui/svg-icons/action/date-range'
import { GridList, GridTile } from 'material-ui/GridList'
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
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    text: {
        /* marginBottom: 40 */
    },
    tile: {
        border: '1px solid black',
        width: '100px',
        height: '100px'
    }
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
                        <GridList 
                            cellHeight={'auto'}
                            cols={7}
                            padding={0}
                        >
                            <GridTile style={styles.tile}>1</GridTile>
                            <GridTile style={styles.tile}>2</GridTile>
                            <GridTile style={styles.tile}>3</GridTile>
                            <GridTile style={styles.tile}>4</GridTile>
                            <GridTile style={styles.tile}>5</GridTile>
                            <GridTile style={styles.tile}>6</GridTile>
                            <GridTile style={styles.tile}>7</GridTile>
                        </GridList>
                    </CardText>
                </Card>
                <AddFloatingAddButton dialog={<WorkoutDialog/>}/>
            </div>
        )
    }
}

export default Workouts