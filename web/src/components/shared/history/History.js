import React, { Component } from 'react';

import { black, red500 } from 'material-ui/styles/colors'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'

import ActionRestore from 'material-ui/svg-icons/action/restore'
import ActionInfo from 'material-ui/svg-icons/action/info'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ContentClear from 'material-ui/svg-icons/content/clear'

import HistoryOptions from './HistoryOptions'
import HistoryCard from './HistoryCard'
import Spinner from '../../shared/Spinner'

const defaultFilters = {
    offset: 0,
    limit: 5,
    order: 'desc',
    toDate: undefined,
    fromDate: undefined,
}

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
    },
    icon: {
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    paginationButton: {
        color: black,
        width: 150
    },
    buttonRow: {
        textAlign: 'center'
    }
}

class History extends Component {
    constructor(props) {
        super(props);

        let defaultToDate = new Date();
        defaultToDate.setDate(defaultToDate.getDate() + 1);
    
        let defaultFromDate = new Date(defaultToDate);
        defaultFromDate.setDate(defaultFromDate.getDate() - 30);
    
        this.state = {  
            filters: props.defaultFilters ? props.defaultFilters : { 
                ...defaultFilters, 
                toDate: defaultToDate.getTime(), 
                fromDate: defaultFromDate.getTime() 
            } 
        }; 
        
        if (!props.defaultFilters) this.props.onFilterChange(this.state.filters);
    }

    handleNextClick = () => {
        this.updateFilters({
            ...this.state.filters,
            offset: this.state.filters.offset + this.state.filters.limit
        });
    }

    handlePreviousClick = () => {     
        this.updateFilters({
            ...this.state.filters,
            offset: this.state.filters.offset - this.state.filters.limit
        });
    }

    handleFiltersChange = (filters) => {
        let routineChanged = this.state.filters.routineId !== filters.routineId;
        let fromDateChanged = this.state.filters.fromDate !== filters.fromDate;
        let toDateChanged = this.state.filters.toDate !== filters.toDate;

        if (routineChanged || fromDateChanged || toDateChanged) {
            filters.offset = 0;
        }

        this.updateFilters(filters);
    }

    updateFilters = (filters) => {
        this.setState({ filters: filters }, () => {
            this.props.onFilterChange(this.state.filters);
        })
    }

    render() {
        let filters = this.state.filters;
        let start;
        let end;

        if (this.props.data) {
            start = filters.offset + 1;
            end = start - 1 + this.props.data.length;
        }

        return (
            <HistoryCard 
                title={this.props.title}
                color={this.props.color}
                icon={<ActionRestore/>}
                header={
                    <HistoryOptions 
                        filters={this.state.filters} 
                        onChange={this.handleFiltersChange}
                        disabled={this.props.refreshing}
                    />
                }
                refreshing={this.props.refreshing}
                emptyContent={
                    <ListItem 
                        primaryText={'No records match the current filter criteria'}
                        leftIcon={<ContentClear/>}
                    />
                }
                footer={
                    <div style={styles.buttonRow}>
                        <FlatButton
                            onClick={this.handlePreviousClick}
                            disabled={this.props.refreshing || start === 1}
                            icon={<HardwareKeyboardArrowLeft/>}
                        />
                        <FlatButton 
                            label={this.props.refreshing ? ' ' : 
                                this.props.total > 0 ? start + '-' + end + ' of ' + this.props.total : 'No Results'
                            }
                            disabled={true}
                            style={styles.paginationButton}
                        />
                        <FlatButton 
                            onClick={this.handleNextClick} 
                            icon={<HardwareKeyboardArrowRight/>}
                            disabled={this.props.refreshing || end === this.props.total}
                        />
                    </div>
                }
            >
                {this.props.children}
            </HistoryCard>
        )
    }
}

export default History