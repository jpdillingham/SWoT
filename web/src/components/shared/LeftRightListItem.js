import React, { Component } from 'react';

import ListItem from 'material-ui/List/ListItem';

const styles = {
    right: {
        float: 'right',
        marginRight: 10,
    },
};

class LeftRightListItem extends Component {
    render() {
        let props = { ...this.props };
        delete props.rightText;
        delete props.leftText;

        return (
            <ListItem
                {...props}
                primaryText={
                    <span>
                        <span>{this.props.leftText}</span>
                        <span style={styles.right}>{this.props.rightText}</span>
                    </span>
                }
            />            
        );
    }
}

export default LeftRightListItem;