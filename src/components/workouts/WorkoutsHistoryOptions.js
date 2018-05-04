import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem'

const limitOptions = [ 5, 10, 25, 50 ];
const sortOptions = [ 'ASC', 'DESC' ];

const styles = {
    order: {
        width: 100,
    },
    limit: {
        width: 75,
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
                    floatingLabelText="Sort"
                    style={styles.order} 
                    value={this.props.filters.order.toUpperCase()} 
                    onChange={(event, index, value) => this.handleChange('order', event, index, value)}
                >
                    {sortOptions.map((o, index) => 
                        <MenuItem 
                            key={index} 
                            value={o} 
                            primaryText={o} 
                        />                    
                    )}
                </SelectField>
                <SelectField 
                    floatingLabelText="Limit"
                    style={styles.limit} 
                    value={this.props.filters.limit} 
                    onChange={(event, index, value) => this.handleChange('limit', event, index, value)}
                >
                    {limitOptions.map((o, index) => 
                        <MenuItem 
                            key={index} 
                            value={o} 
                            primaryText={o} 
                        />                    
                    )}
                </SelectField>
            </div>
        )
    }
}

export default WorkoutsHistoryOptions