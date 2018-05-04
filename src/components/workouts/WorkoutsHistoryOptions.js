import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem'

import { FILTER_SORT_ORDER_OPTIONS, FILTER_LIMIT_OPTIONS } from '../../constants'

const styles = {
    order: {
        width: 150,
    },
    limit: {
        width: 75,
    },
    routine: {
        width: 300,
    }
}

class WorkoutsHistoryOptions extends Component {
    handleChange = (filter, event, index, value) => {
        this.props.onChange({ ...this.props.filters, [filter]: value });
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default WorkoutsHistoryOptions