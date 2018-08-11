import React, { Component } from 'react';

import { NavigationExpandLess, NavigationExpandMore } from 'material-ui/svg-icons';
import { black } from 'material-ui/styles/colors';
import LeftRightListItem from './LeftRightListItem';

const styles = {
    right: {
        float: 'right',
        marginRight: 10,
    },
    content: {
        marginLeft: 20,
    },
};

class ToggledLeftRightListItem extends Component {
    state = { toggle: this.props.defaultToggleOpen === undefined ? false : this.props.defaultToggleOpen };

    handleToggle = () => {
        this.setState({ toggle: !this.state.toggle });
    }

    render() {
        let props = { ...this.props };
        delete props.children;
        delete props.defaultToggleOpen;

        if (this.props.children) {
            props.onClick = () => this.handleToggle();
            props.rightIcon = this.state.toggle ? <NavigationExpandLess color={black}/> : <NavigationExpandMore color={black}/>;
        }

        return (
            <div>
                <LeftRightListItem {...props }/>
                <div style={styles.content}>
                    {!this.state.toggle ? '' : this.props.children}
                </div>
            </div>
        );
    }
}

export default ToggledLeftRightListItem;