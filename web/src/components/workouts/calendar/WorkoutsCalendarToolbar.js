import React, { Component } from 'react';
import moment from 'moment'

class WorkoutsCalendarToolbar extends Component {
        goToBack = () => {
          this.props.date.setMonth(this.props.date.getMonth() - 1);
          this.props.onNavigate('prev');
        };
      
        goToNext = () => {
          this.props.date.setMonth(this.props.date.getMonth() + 1);
          this.props.onNavigate('next');
        };
      
        goToCurrent = () => {
          const now = new Date();
          this.props.date.setMonth(now.getMonth());
          this.props.date.setYear(now.getFullYear());
          this.props.onNavigate('current');
        };
      
        label = () => {
          const date = moment(this.props.date);
          return (
            <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
          );
        };
      
        render() {
            return (
                <div>
                <label>{this.label()}</label>
          
                <div>
                  <button onClick={this.goToBack}>&#8249;</button>
                  <button onClick={this.goToCurrent}>today</button>
                  <button onClick={this.goToNext}>&#8250;</button>
                </div>
              </div >
            )
        }
}

export default WorkoutsCalendarToolbar