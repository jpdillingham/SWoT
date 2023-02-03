import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setTitle } from '../app/AppActions';
import HelpChecklist from './HelpChecklist';

class Help extends Component {
    componentWillMount = () => {
        this.props.setTitle('Help');
    };

    render() {
        return (
            <HelpChecklist/>
        );
    }
}

const mapDispatchToProps = {
    setTitle,
};

export default connect(undefined, mapDispatchToProps)(Help);