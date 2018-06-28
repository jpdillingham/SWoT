import React, { Component } from 'react';

import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import { ActionDone, ToggleCheckBoxOutlineBlank, ToggleCheckBox, ActionHelp } from 'material-ui/svg-icons';
import { black, green500, yellow500 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment'

const styles = {
    card: {
        width: '390px',
        margin: 'auto',
    },
    cardHeader: {
        backgroundColor: yellow500,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
}
class HelpChecklist extends Component {
    render() {
        return (
            <Card zDepth={2} style={styles.card}>
                <CardHeader                        
                    titleStyle={styles.cardTitle}
                    style={styles.cardHeader}
                    title={'Configuration Checklist'}
                    avatar={<Avatar backgroundColor={yellow500} color={black} size={36} icon={<ActionHelp/>}></Avatar>}
                >
                </CardHeader>
                <CardText>
                    <List>
                        <ListItem
                            leftIcon={<ToggleCheckBox color={green500}/>}
                            insetChildren={true}
                            primaryText="Add Exercises"
                        />
                        <ListItem
                            leftIcon={<ToggleCheckBoxOutlineBlank/>}
                            insetChildren={true}
                            primaryText="Add Routines"
                        />
                        <ListItem
                            leftIcon={<ToggleCheckBoxOutlineBlank/>}
                            insetChildren={true}
                            primaryText="Schedule Workouts"
                        />
                    </List>
                </CardText>
            </Card>
        )
    }
}

export default HelpChecklist