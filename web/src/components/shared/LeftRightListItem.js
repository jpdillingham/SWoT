import React, { Component } from 'react';

import ListItem from 'material-ui/List/ListItem'

const styles = {
    right: {
        float: 'right',
        marginRight: 10
    },
}

class LeftRightListItem extends Component {
    render() {
        return (
            <ListItem
                leftIcon={this.props.leftIcon} 
                primaryText={
                    <span>
                        <span>{this.props.leftText}</span>
                        <span style={styles.right}>{this.props.rightText}</span>
                    </span>
                }
            />            
        )
    }
}

export default LeftRightListItem