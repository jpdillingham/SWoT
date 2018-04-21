import React, { Component } from 'react';

import {Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionHistory from 'material-ui/svg-icons/action/history';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import Avatar from 'material-ui/Avatar';

import ExerciseDialog from './ExerciseDialog'
import ExerciseDeleteDialog from './ExerciseDeleteDialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR, INTENTS } from '../../constants';

const styles = {
    deleteDialog: {
        zIndex: 2000,
    },
    container: {
        height: '100%'
    },
    cardHeader: {
        backgroundColor: EXERCISE_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    iconMenu: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
    card: {
        width: CARD_WIDTH - 40,
        height: '100%',
        position: 'relative',
        marginBottom: 5,
        marginLeft: 5,
        marginTop: 20
    },
    fab: {
        margin: 0,
        top: 47,
        right: 20,
        bottom: 'auto',
        left: 'auto',
        position: 'absolute',
        zIndex: 1000,
    },
    link: {
        cursor: 'pointer',
    },
}

const initialState = {
}

class ExerciseForm extends Component {
    state = this.props.exercise;

    handleHistoryClick = () => {

    }

    handleMetricChange = (event, value, metric) => {
        this.setState({ 
            ...this.state, 
            metrics: this.state.metrics.map(m => {
                return m.name === metric.name ? { ...metric, value: value } : m;
            })
        })
    }
    
    handleSave = () => {

    }

    getMetricDisplayName = (metric) => {
        return metric.name + (metric.uom ? ' (' + metric.uom + ')' : '')
    }

    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown'
        }

        return (
            <div style={styles.container}>
                <Card zDepth={2} style={styles.card}>
                    <CardHeader                        
                        titleStyle={styles.cardTitle}
                        style={styles.cardHeader}
                        title={
                            <span 
                                style={styles.link}
                                onClick={() => window.open(this.props.exercise.url)}
                            >
                                {this.props.exercise.name}
                            </span>
                        }
                        avatar={
                            <Avatar 
                                backgroundColor={EXERCISE_AVATAR_COLOR} 
                                size={32} 
                                src={process.env.PUBLIC_URL + '/img/' + exerciseImage.toLowerCase() + '.png'} 
                            />
                        }
                    >
                        <FloatingActionButton 
                            secondary={false} 
                            zDepth={2} 
                            style={styles.fab}
                            mini={true}
                            onClick={this.handleHistoryClick}
                        >
                            <ActionHistory />
                        </FloatingActionButton>
                    </CardHeader>
                    <CardText style={styles.text}>
                            {this.props.exercise.metrics ? this.props.exercise.metrics.map((m, index) =>    
                                <TextField
                                    key={index}
                                    hintText={this.getMetricDisplayName(m)}
                                    defaultValue={m.value}
                                    floatingLabelText={this.getMetricDisplayName(m)}
                                    onChange={(e,v) => this.handleMetricChange(e,v,m)}
                                />
                            ) : ''}
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default ExerciseForm