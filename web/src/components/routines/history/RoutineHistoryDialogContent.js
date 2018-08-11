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

class RoutineHistoryDialogContent extends Component {
    render() {
        let workouts = this.props.history.workouts || [];

        return (
            <Table>
                <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                    style={this.props.refreshing ? { backgroundColor: grey300 } : {}}
                >
                    <TableRow>
                        <TableHeaderColumn style={styles.date}>Date</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                >
                    {!workouts || !workouts.length ? '' : workouts
                        .sort(sortByProp('endTime', this.props.filters.order))
                        .map((w, index) => 
                            <TableRow style={this.props.refreshing ? { backgroundColor: grey300 } : {}} key={index}>
                                <TableRowColumn style={styles.date}>{moment(w.endTime).calendar()}</TableRowColumn>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        );
    }
}

export default RoutineHistoryDialogContent;

