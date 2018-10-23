/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import messages from './messages';
import Timer from '../../components/Timer';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
	// There should be a table to track which minutes the user is going to have
	// TODO have the user pick out which times that he/she wants to have
	// TODO maybe I can have the user pick out how many section he/she wants
	//I can always disable the button if intervalRunning is true
	//There are 1500 seconds in 25 minutes
	state = {
		time: 25,
		intervalRunning: false,
		timesRan: 0,
		message: '',
	}
	startTimer = () =>{
		// The timer should go down 
		if(!this.state.intervalRunning){
			this.timer = setInterval(this.tick, 500)
			this.setState({intervalRunning: true})
		}else{
			this.setState({message: 'You can only press the start once'})
		}
	}
	// Resets the timer to its current value
	resetTimer = () => {
		clearInterval(this.timer)
		this.setState({
			time: 25,
			intervalRunning: false,
			message: '',
		})
	}

	tick = () => {

		this.setState({time: this.state.time - 1})

		//When the timer is done running, then the times ran will update
		//Times ran will control which timer is going next
		if(this.state.time <= 0){
			this.setState({
				message: 'The timer has run out',
				timesRan: this.state.timesRan += 1,
			})
			clearInterval(this.timer)
		}
	}	
	render() {
		const { time } = this.state
		return (
		  <div>
			<FormattedMessage {...messages.header} />
			<Timer 
				resetTimer={this.resetTimer}
				time={this.state.time}
				startTimer={this.startTimer}
			/>
			<span>{this.state.message}</span>

		  </div>
		);
  }
}
