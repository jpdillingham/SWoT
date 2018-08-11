import React, { Component } from 'react';
import moment from 'moment';

import { sortByProp } from '../../../util';

import { grey300 } from 'material-ui/styles/colors';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const styles = {
    date: {
        width: 60,
    },
};

class ExerciseHistoryDialogContent extends Component {
    getLabels = () => {
        let metrics = this.props.exercise.metrics;
        return !metrics || !metrics.length ? '' : 
                metrics.map(m => m.name)
                    .reduce((acc, m) => acc.concat('/' + m));
    }
    getValues = (exercise) => {
        let metrics = this.props.exercise.metrics;
        return !metrics || !metrics.length ? '' :
                metrics
                .map(m => this.getValue(exercise, m.name))
                .reduce((acc, v) => acc.concat('/' + v)); 
    }

    getValue = (exercise, metric) => {
        var foundMetric = exercise.metrics.find(m => m.name === metric);
        return !foundMetric ? '' : !foundMetric.value ? '-' : foundMetric.value;
    }

    render() {
        let history = this.props.history;
        let exercises = history ? history.exercises : [];

        exercises = exercises.filter(e => e.endTime);

        return (
            <Table>
                <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                    style={this.props.refreshing ? { backgroundColor: grey300 } : {}}
                >
                    <TableRow>
                        <TableHeaderColumn style={styles.date}>Date</TableHeaderColumn>
                        <TableHeaderColumn>{this.getLabels()}</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                >
                    {!exercises ? '' : exercises
                        .sort(sortByProp('endTime', this.props.filters.order))
                        .map((e, index) => 
                            <TableRow style={this.props.refreshing ? { backgroundColor: grey300 } : {}} key={index}>
                                <TableRowColumn style={styles.date}>{moment(e.endTime).format('ddd M/DD')}</TableRowColumn>
                                <TableRowColumn key={index}>
                                    {this.getValues(e)}
                                </TableRowColumn>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        );
    }
}

export default ExerciseHistoryDialogContent;

