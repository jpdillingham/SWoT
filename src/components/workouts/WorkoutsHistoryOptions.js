import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem'

const limitOptions = [ 5, 10, 25, 50 ];

const styles = {
    limit: {
        width: 50,
    }
}

class WorkoutsHistoryOptions extends Component {
    handleLimitChange = (event, index, value) => {
        this.props.onChange({ ...this.props.filters, limit: value });
    }

    render() {
        return (
            <SelectField 
                style={styles.limit} 
                value={this.props.filters.limit} 
                onChange={this.handleLimitChange}
            >
                {limitOptions.map((o, index) => 
                    <MenuItem 
                        key={index} 
                        value={o} 
                        primaryText={o} 
                    />                    
                )}
            </SelectField>
        )
    }
}

export default WorkoutsHistoryOptions