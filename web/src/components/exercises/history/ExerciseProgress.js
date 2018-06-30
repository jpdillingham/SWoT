import React, { Component } from 'react';
import { connect} from 'react-redux';
import moment from 'moment';

import Spinner from '../../shared/Spinner';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { black, red500, grey300 } from 'material-ui/styles/colors';
import { WORKOUT_AVATAR_COLOR, CHART_OPTIONS, CHART_SERIES_OPTIONS, CHART_SERIES_COLORS } from '../../../constants'
import Avatar from 'material-ui/Avatar'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import { ActionTrendingUp, ActionInfo } from 'material-ui/svg-icons';
import ExerciseProgressOptions from './ExerciseProgressOptions';
import Divider from 'material-ui/Divider/Divider';
import { List, ListItem } from 'material-ui/List';
import { ContentClear } from 'material-ui/svg-icons';
import HelpChecklist from '../../help/HelpChecklist';

import { fetchExercises } from '../ExercisesActions';
import { fetchExercisesHistory } from '../history/ExercisesHistoryActions';
import { setTitle, showSnackbar } from '../../app/AppActions';

import { sortByProp } from '../../../util';

import { Line } from 'react-chartjs-2';

const initialState = {
    window: {
        width: 0,
        height: 0,
    },
    filters: {
        fromTime: undefined,
        toTime: undefined,
        order: 'asc',
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
        marginTop: 10,
    },
    container: {
        position: 'relative',
    },
}

class ExerciseProgress extends Component {
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
        this.props.setTitle('Exercises')
        this.updateDimensions();

        this.setState({ loadApi: { isExecuting: true }}, () => {
            let promises = [];
            promises.push(this.props.fetchExercises());

            if (this.state.filters.exerciseId) {
                promises.push(this.props.fetchExercisesHistory(this.state.filters));
            }

            Promise.all(promises)
            .then(response => {
                this.setState({ loadApi: { isExecuting: false, isErrored: false }});
            }, error => {
                this.props.showSnackbar('Error fetching Exercises: ' + error);
                this.setState({ loadApi: { isExecuting: false, isErrored: true }});
            })
        })
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
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

    getDistinctMetrics = (exercises) => {
        let metrics = !exercises ? undefined : exercises.map(e => e.metrics);
        return !metrics || metrics.length === 0 ? [] : metrics
            .reduce((acc, e) => acc.concat(e))
            .sort(sortByProp('name'))
            .filter((value, index, array) => index > 0 ? value.name !== array[index - 1].name : true)
            .map(m => { return { name: m.name, uom: m.uom }});
    }

    getDatasets = (exercises) => {
        let datasets = this.getDistinctMetrics(exercises)
            .reduce((acc, m, index) => acc.concat({ 
                ...CHART_SERIES_OPTIONS,
                label: m.name, 
                data: [],
                borderColor: CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length],
                backgroundColor: CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length],
            }), []);

        exercises.forEach(e => datasets = e.metrics.reduce((acc, m) => { 
                var set = acc.find(s => s.label === m.name);
                set.data = set.data.concat(m.value);
                acc[acc.indexOf(set)] = set;
                return acc
            }, datasets))
        
        return datasets;
    }

    updateDimensions = () => {
        this.setState({ window: { width: window.innerWidth, height: window.innerHeight }});
    }

    render() {
        let history = this.props.exercisesHistory;
        let exercises = history && history.exercises ? history.exercises : [];
        exercises = exercises.filter(e => e.endTime);

        let chartData = {
            labels: exercises.map(e => moment(e.endTime).format('l')),
            datasets: this.getDatasets(exercises),
        };

        return (
            this.state.loadApi.isExecuting ? <Spinner size={48}/> : 
                this.state.loadApi.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                    !exercises || !exercises.length ? <HelpChecklist/> :
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
                                    <div style={styles.container}>
                                        <ExerciseProgressOptions
                                            filters={this.state.filters} 
                                            exercises={this.props.exercises}
                                            onChange={this.handleFiltersChange}
                                            disabled={this.state.loadApi.isExecuting || this.state.refreshApi.isExecuting}
                                        />
                                        <Divider style={styles.headerDivider}/>
                                        {!this.state.filters.exerciseId ? 
                                            <List><ListItem 
                                                primaryText={'Select an Exercise to view progress'}
                                                leftIcon={<ActionInfo color={black}/>}
                                            /></List> :
                                            this.state.refreshApi.isExecuting ? '' : 
                                                exercises.length === 0 ? 
                                                    <List><ListItem 
                                                        primaryText={'No records match the current filter criteria'}
                                                        leftIcon={<ContentClear color={black}/>}
                                                    /></List> :
                                                    <div style={{marginTop: 15, height: this.state.window.height - 290}}>
                                                        <Line 
                                                            data={chartData}
                                                            options={CHART_OPTIONS}
                                                        />
                                                    </div>
                                        }
                                        {this.state.refreshApi.isExecuting ? <Spinner/> : ''}
                                    </div>
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
    setTitle,
    showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseProgress)