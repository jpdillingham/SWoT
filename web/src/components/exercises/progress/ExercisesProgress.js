import React, { Component } from 'react';
import { connect} from 'react-redux';

import Spinner from '../../shared/Spinner';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { black, red500, grey300 } from 'material-ui/styles/colors';
import { WORKOUT_AVATAR_COLOR } from '../../../constants'
import Avatar from 'material-ui/Avatar'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ActionTrendingUp } from 'material-ui/svg-icons';

const initialState = {
    loadApi: {
        isExecuting: false,
        isErrored: false,
    },
    refreshApi: {
        isExecuting: false,
        isErrored: false,
    },
}

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
    icon: {
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

class ExercisesProgress extends Component {
    state = initialState;

    componentWillMount() {

    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    render() {
        return (
           
            this.state.loadApi.isExecuting ? <Spinner size={48}/> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    <div>
                        <Card 
                            zDepth={2}                 
                            style={!this.state.refreshApi.isExecuting ? styles.card : 
                                { 
                                    ...styles.card, 
                                    backgroundColor: grey300 
                                }
                            }
                        >
                            <CardHeader
                                title={'Progress'}
                                titleStyle={styles.cardTitle}
                                style={styles.cardHeader}
                                avatar={<Avatar backgroundColor={WORKOUT_AVATAR_COLOR} color={black} size={36} icon={<ActionTrendingUp/>}></Avatar>}
                            />
                            <CardText>
                                Hello!
                                {this.state.refreshApi.isExecuting ? <Spinner/> : ''}
                            </CardText>
                        </Card>
                    </div> 
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesProgress)