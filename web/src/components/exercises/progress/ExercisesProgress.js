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

import { fetchExercises } from '../ExercisesActions';
import { fetchExercisesHistory } from '../history/ExercisesHistoryActions';
import { showSnackbar } from '../../app/AppActions';

import { sortByProp } from '../../../util';

import { Line } from 'react-chartjs-2';

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
                exerciseId: this.props.match.params.id,
            },
        };        
    };

    componentWillMount() {
        // todo: fetch history

        this.setState({ loadApi: { isExecuting: true }}, () => {
            Promise.all([
                this.props.fetchExercises(),
                this.props.fetchExercisesHistory(this.state.filters)
            ])
            .then(response => {
                this.setState({ loadApi: { isExecuting: false, isErrored: false }});
            }, error => {
                this.props.showSnackbar('Error fetching Exercises: ' + error);
                this.setState({ loadApi: { isExecuting: false, isErrored: true }});
            })
        })
    }

    handleFiltersChange = (filters) => {
        this.setState({ 
            filters: filters,
            refreshApi: { isExecuting: true },
        }, () => {
            this.props.fetchExercisesHistory(filters)
            .then(response => {
                this.setState({ refreshApi: { isExecuting: false, isErrored: false }});
            }, error => {
                this.props.showSnackbar('Error fetching Exercises: ' + error);
                this.setState({ refreshApi: { isExecuting: false, isErrored: true }});
            })
        });
    }

    getValue = (exercise, name) => {
        let metric = exercise.metrics.find(m => m.name === name);
        return !metric ? undefined : metric.value;
    }

    getValues = (exercises, metrics) => {
        return !exercises ? undefined : exercises.map(e => { 
            return { 
                endTime: e.endTime,
                values: metrics.map(m => { 
                    return { 
                        name: m.name, value: this.getValue(e, m.name) 
                    }
                }),
            }
        });
    }

    getDistinctMetrics = (exercises) => {
        let metrics = !exercises ? undefined : exercises.map(e => e.metrics);
        return !metrics || metrics.length === 0 ? [] : metrics
            .reduce((acc, e) => acc.concat(e))
            .sort(sortByProp('name'))
            .filter((value, index, array) => index > 0 ? value.name !== array[index - 1].name : true)
            .map(m => { return { name: m.name, uom: m.uom }});
    }

    render() {
        let history = this.props.exercisesHistory;
        let exercises = history && history.exercises ? history.exercises : undefined;

        let metrics = this.getDistinctMetrics(exercises);
        let values = this.getValues(exercises, metrics);

        let chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [56, 95, 8, 18, 65, 55, 4]
                }
            ]
        };


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
                                    disabled={this.state.loadApi.isExecuting || this.state.refreshApi.isExecuting}
                                />
                                <Divider style={styles.headerDivider}/>
                                {JSON.stringify(metrics)}
                                <br/><br/>
                                {JSON.stringify(values)}
                                <Line data={chartData}/>
                                {this.state.refreshApi.isExecuting ? <Spinner/> : ''}
                            </CardText>
                        </Card>
                    </div> 
        )
    }
}

const mapStateToProps = (state) => ({
    exercises: state.exercises,
    exercisesHistory: state.exercisesHistory,
});

const mapDispatchToProps = {
    fetchExercises,
    fetchExercisesHistory,
    showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesProgress)