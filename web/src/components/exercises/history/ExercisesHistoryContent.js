import React, { Component } from 'react';
import moment from 'moment';

import { sortByProp } from '../../../util';

import { grey300 } from 'material-ui/styles/colors';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class ExercisesHistoryContent extends Component {
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
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        {this.props.metrics.map((m, index) => 
                            <TableHeaderColumn key={index}>
                                {m.name}{m.uom ? ' (' + m.uom + ')' : ''}
                            </TableHeaderColumn>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                >
                    {!exercises ? '' : exercises
                        .sort(sortByProp('endTime', this.props.filters.order))
                        .map((e, index) => 
                            <TableRow style={this.props.refreshing ? { backgroundColor: grey300 } : {}} key={index}>
                                <TableRowColumn>{moment(e.endTime).format('ddd M/DD [at] h:mmp')}</TableRowColumn>
                                <TableRowColumn>{e.name}</TableRowColumn>
                                {this.props.metrics.map((m, index) => 
                                    <TableRowColumn key={index}>
                                        {this.getValue(e, m.name)}
                                    </TableRowColumn>
                                )}
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        );
    }
}

export default ExercisesHistoryContent;

