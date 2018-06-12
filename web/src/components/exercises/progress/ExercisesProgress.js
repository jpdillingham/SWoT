import React, { Component } from 'react';
import { connect} from 'react-redux';

import Spinner from '../../shared/Spinner';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { black, red500, grey300 } from 'material-ui/styles/colors';
import { WORKOUT_AVATAR_COLOR } from '../../../constants'
import Avatar from 'material-ui/Avatar'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import { ActionTrendingUp } from 'material-ui/svg-icons';
import ExercisesProgressOptions from './ExercisesProgressOptions';
import Divider from 'material-ui/Divider/Divider';

import { fetchExercises} from '../ExercisesActions';
import { showSnackbar } from '../../app/AppActions';

const initialState = {
    filters: {
        fromTime: undefined,
        toTime: undefined,
    },
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
    headerDivider: {
        marginTop: 10
    },
}

class ExercisesProgress extends Component {
    constructor(props) {
        super(props);

        let defaulttoTime = new Date();
        defaulttoTime.setDate(defaulttoTime.getDate() + 1);
    
        let defaultfromTime = new Date(defaulttoTime);
        defaultfromTime.setDate(defaultfromTime.getDate() - 30);
    
        this.state = { 
            ...initialState, 
            filters: { 
                ...initialState.filters, 
                toTime: defaulttoTime.getTime(), 
                fromTime: defaultfromTime.getTime(),
            } 
        };        
    }

    componentWillMount() {
        // todo: fetch history

        this.setState({ loadApi: { isExecuting: true }}, () => {
            this.props.fetchExercises()
            .then(response => {
                this.setState({ loadApi: { isExecuting: false, isErrored: false }});
            }, error => {
                this.props.showSnackbar('Error fetching Exercises: ' + error);
                this.setState({ loadApi: { isExecuting: false, isErrored: true }});
            })
        })
    }

    handleFiltersChange = (filters) => {
        this.setState({ filters: filters });
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
                                <ExercisesProgressOptions
                                    filters={this.state.filters} 
                                    exercises={this.props.exercises}
                                    onChange={this.handleFiltersChange}
                                    disabled={this.props.refreshing}
                                />
                                <Divider style={styles.headerDivider}/>
                                Hello!
                                {this.state.refreshApi.isExecuting ? <Spinner/> : ''}
                            </CardText>
                        </Card>
                    </div> 
        )
    }
}

const mapStateToProps = (state) => ({
    exercises: state.exercises,
});

const mapDispatchToProps = {
    fetchExercises,
    showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesProgress)