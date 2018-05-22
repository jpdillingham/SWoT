import React, { Component } from 'react';

import { ListItem } from 'material-ui/List'

import ActionRestore from 'material-ui/svg-icons/action/restore'
import ContentClear from 'material-ui/svg-icons/content/clear'

import HistoryOptions from './HistoryOptions'
import HistoryCard from './HistoryCard'
import HistoryPagination from './HistoryPagination';

const defaultFilters = {
    offset: 0,
    limit: 5,
    order: 'desc',
    toDate: undefined,
    fromDate: undefined,
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
                    <HistoryPagination
                        start={start}
                        end={end}
                        total={this.props.total}
                        refreshing={this.props.refreshing}
                        onPreviousClick={this.handlePreviousClick}
                        onNextClick={this.handleNextClick}
                    />
                }
            >
                {this.props.children}
            </HistoryCard>
        )
    }
}

export default History