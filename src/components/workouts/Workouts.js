import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWorkouts } from '../workouts/WorkoutsActions'

import {Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'
import AddFloatingAddButton from '../shared/AddFloatingActionButton'
import WorkoutDialog from './WorkoutDialog';
import ActionDateRange from 'material-ui/svg-icons/action/date-range'
//import { GridList, GridTile } from 'material-ui/GridList'
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

const initialState = {
    api: {
        isExecuting: false,
        isErrored: false,
    }
}

class Workouts extends Component {
    state = initialState;

    componentWillMount() {
        this.setState({ api: { ...this.state.api, isExecuting: true }})

        this.props.fetchWorkouts()
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }})
            }, error => {
                this.setState({ api: { isExecuting: false, isErrored: true }})
            })
    }

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
                        {this.props.workouts.map(w => 
                            <div>{JSON.stringify(w)}</div>
                        )}
                    </CardText>
                </Card>
                <AddFloatingAddButton dialog={<WorkoutDialog/>}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Workouts)