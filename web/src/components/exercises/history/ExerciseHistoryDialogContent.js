import React, { Component } from 'react';
import moment from 'moment';

import { sortByProp } from '../../../util'

import { grey300 } from 'material-ui/styles/colors'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class ExerciseHistoryDialogContent extends Component {
    getMetricsColumnText = () => {
        return !this.props.metrics || !this.props.metrics.length ? '' : 
                this.props.metrics
                    .map(m => m.name)
                    .sort()
                    .reduce((acc, m) => acc.concat('/' + m));
    }
    getValues = (exercise) => {
        return !exercise.metrics || !exercise.metrics.length ? '' :
                exercise.metrics
                .map(m => this.getValue(exercise, m.name))
                .sort()
                .reduce((acc, v) => acc.concat('/' + v)) 
    }

    getValue = (exercise, metric) => {
        var foundMetric = exercise.metrics.find(m => m.name === metric);
        return !foundMetric ? '' : !foundMetric.value ? '-' : foundMetric.value;
    }

    render() {
        let history = this.props.exercisesHistory;
        let exercises = history ? history.exercises : [];

        return (
            <Table>
                <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                    style={this.props.refreshing ? { backgroundColor: grey300 } : {}}
                >
                    <TableRow>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                        <TableHeaderColumn>{this.getMetricsColumnText()}</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                >
                    {!exercises ? '' : exercises
                        .sort(sortByProp('endTime', this.props.filters.order))
                        .map((e, index) => 
                            <TableRow style={this.props.refreshing ? { backgroundColor: grey300 } : {}} key={index}>
                                <TableRowColumn>{moment(e.endTime).format('ddd M/DD')}</TableRowColumn>
                                <TableRowColumn key={index}>
                                    {this.getValues(e)}
                                </TableRowColumn>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        )
    }
}

export default ExerciseHistoryDialogContent

