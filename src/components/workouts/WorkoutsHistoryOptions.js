import React, { Component } from 'react';

import { red500 } from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel'

import { FILTER_SORT_ORDER_OPTIONS, FILTER_LIMIT_OPTIONS } from '../../constants'

const styles = {
    order: {
        width: 150,
        marginRight: 5,
    },
    limit: {
        width: 75,
        marginRight: 5,
    },
    routine: {
        width: 300,
    },
    routineClearIcon: {
        width: 18,
        height: 18,
        color: red500,
        cursor: 'pointer',
        marginBottom: 15,
    }
}

class WorkoutsHistoryOptions extends Component {
    handleChange = (filter, event, index, value) => {
        this.props.onChange({ ...this.props.filters, [filter]: value });
    }

    handleRoutineFilterClearClick = () => {
        let filters = { ...this.props.filters };
        delete filters.routine;

        this.props.onChange(filters);
    }

    render() {
        return (
            <div>
                <SelectField 
                    floatingLabelText="Sort By"
                    style={styles.order} 
                    value={FILTER_SORT_ORDER_OPTIONS.find(o => o.value.toLowerCase() === this.props.filters.order.toLowerCase()).value} 
                    onChange={(event, index, value) => this.handleChange('order', event, index, value)}
                >
                    {FILTER_SORT_ORDER_OPTIONS.map((o, index) => 
                        <MenuItem 
                            key={index} 
                            value={o.value} 
                            primaryText={o.caption} 
                        />                    
                    )}
                </SelectField>
                <SelectField 
                    floatingLabelText="Per Page"
                    style={styles.limit} 
                    value={this.props.filters.limit} 
                    onChange={(event, index, value) => this.handleChange('limit', event, index, value)}
                >
                    {FILTER_LIMIT_OPTIONS.map((o, index) => 
                        <MenuItem 
                            key={index} 
                            value={o.value} 
                            primaryText={o.caption} 
                        />                    
                    )}
                </SelectField>
                <SelectField 
                        floatingLabelText={'Filter By'}
                        style={styles.routine} 
                        value={this.props.filters.routine} 
                        onChange={(event, index, value) => this.handleChange('routine', event, index, value)}
                    >
                        {this.props.routines.map((r, index) => 
                            <MenuItem 
                                key={index} 
                                value={r.id} 
                                primaryText={r.name} 
                            />                    
                        )}
                </SelectField>
                {this.props.filters.routine !== undefined ? 
                    <NavigationCancel style={styles.routineClearIcon} onClick={this.handleRoutineFilterClearClick}/>
                : '' }

            </div>
        )
    }
}

export default WorkoutsHistoryOptions