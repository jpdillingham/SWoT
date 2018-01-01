import React, { Component } from 'react';

import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import { ListItem } from 'material-ui/List';

class Metric extends Component {
    render() {
        return (
            <ListItem
                leftIcon={<ContentCopy/>}
                primaryText={this.props.name}
                secondaryText={this.props.defaultValue ? this.props.defaultValue : ''}
            />
        )
    }
}

export default Metric