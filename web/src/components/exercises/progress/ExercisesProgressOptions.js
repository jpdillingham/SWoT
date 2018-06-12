import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'

const styles = {
    order: {
        width: 150,
        marginRight: 5,
    },
    limit: {
        width: 75,
        marginRight: 5,
    },
    dateWrapper: {
        marginBottom: -15,
        display: 'inline-block',
    },
    date: {
        display: 'inline-block',
        position: 'relative',
        top: -15,
    },
    dateField: {
        width: 100,
        marginRight: 5,
        cursor: 'pointer',
    },
}

class ExercisesProgressOptions extends Component {
    handleChange = (filter, event, index, value) => {
        if (!this.props.disabled) {
            this.props.onChange({ ...this.props.filters, [filter]: value });
        }
    }

    render() {
        return (
            <div>
                <div style={styles.dateWrapper}>
                    <DatePicker 
                        floatingLabelText="From"
                        hintText="From" 
                        firstDayOfWeek={0}
                        defaultDate={new Date(this.props.filters.fromTime)}
                        maxDate={new Date(this.props.filters.toTime)}
                        disabled={this.props.disabled}
                        style={styles.date}
                        textFieldStyle={styles.dateField}
                        onChange={(a, date) => this.handleChange('fromTime', undefined, undefined, date.getTime())}
                    />
                    <DatePicker 
                        floatingLabelText="To"
                        hintText="To" 
                        firstDayOfWeek={0}
                        defaultDate={new Date(this.props.filters.toTime)}
                        minDate={new Date(this.props.filters.fromTime)}
                        disabled={this.props.disabled}
                        style={styles.date}
                        textFieldStyle={styles.dateField}
                        onChange={(a, date) => this.handleChange('toTime', undefined, undefined, date.getTime())}
                    />
                </div>
            </div>
        )
    }
}

export default ExercisesProgressOptions