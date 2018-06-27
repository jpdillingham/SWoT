import React, { Component } from 'react';

import Checkbox from 'material-ui/Checkbox';

class HelpChecklist extends Component {
    render() {
        return (
            <div>
                <Checkbox
                    label={<span>Configure <a href="/exercises">Exercises</a></span>}
                />
            </div>
        )
    }
}

export default HelpChecklist