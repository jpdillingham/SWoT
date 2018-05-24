import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

  import { sortByProp } from '../../../util'

class ExercisesHistoryContent extends Component {
    getValue = (exercise, metric) => {
        var foundMetric = exercise.metrics.find(m => m.name === metric);
        return !foundMetric ? '' : !foundMetric.value ? '-' : foundMetric.value;
    }

    render() {
        return (
            <Table>
                <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                >
                    <TableRow>
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
                    {this.props.exercisesHistory.exercises
                        .sort(sortByProp('endTime', this.props.filters.order))
                        .map((e, index) => 
                        <TableRow key={index}>
                            <TableRowColumn>{e.name}</TableRowColumn>
                            {this.props.metrics.map((m, index) => 
                                <TableHeaderColumn key={index}>
                                    {this.getValue(e, m.name)}
                                </TableHeaderColumn>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        )
    }
}

export default ExercisesHistoryContent

