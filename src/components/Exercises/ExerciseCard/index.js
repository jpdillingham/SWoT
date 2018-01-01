import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import AppBar from 'material-ui/AppBar/AppBar';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Metric from './Metric'

class ExerciseCard extends Component {
    render() {
        return (
            <Card zDepth={2} style={styles.card}>
                <CardMedia
                    overlay={<CardTitle 
                        title={this.props.title} 
                        subtitle={
                            <span 
                                style={styles.link} 
                                onClick={() => window.location.href=this.props.subtitle}
                            >
                                {this.props.subtitle}
                            </span>
                        }
                    >
                    </CardTitle>}
                >
                    <img height={94} src="./img/geometric.jpg" alt="" />
                    
                </CardMedia>

                <CardText>
                <List style={{}}>
                    <Subheader style={{ marginTop: -15, marginBottom: -5}} inset={false}>Metrics</Subheader>
                    {Object.keys(this.props.metrics).map(m =>                     
                    <ListItem
                        style={{padding: 0, margin: 0}}
                        leftIcon={<ContentCopy/>}
                        primaryText={m}
                        secondaryText={this.props.metrics[m].uom ? this.props.metrics[m].uom : ''}
                        />)}
                    </List>
                </CardText>
                <CardActions style={{marginTop: -10}}>
                    <FlatButton>Edit</FlatButton>
                    <FlatButton>Delete</FlatButton>
                </CardActions>
            </Card>
        )
    }
}

export default ExerciseCard

const styles = {
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    card: {
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        width: 500
    },
    link: {
        cursor: 'pointer',
    }
}