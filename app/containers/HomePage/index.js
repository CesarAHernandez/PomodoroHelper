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
	// TODO Make it a way so that i can stop the timer PAUSE TIMER
	//I can always disable the button if intervalRunning is true
	//There are 1500 seconds in 25 minutes
	
	state = {
		time: 25,
		paused: false,
		intervalRunning: false,
		timesRan: 0,
		message: '',
	}
	intervalSet = (frequency) => {
		console.log('thisis being set')
		this.timer = setInterval(this.tick, frequency)
	}
	startTimer = () =>{
		// The timer should go down 
		if(!this.state.intervalRunning){
			this.setState({intervalRunning: true})
			this.intervalSet(500)
		}else{
			this.setState({message: 'You can only press the start once'})
		}
	}
	//Pause and resume timer SHOULD share the same button
	//For now i'm going to make them completely seperated
	//Toggle timer handles the pause and resume
	toggleTimer = () =>{
		if(!this.state.paused){

			clearInterval(this.timer)
			this.setState({paused: true, message:'Timer is PAUSED'})


		}else if(this.state.paused){

			this.intervalSet(500)
			this.setState({paused: false, message:''})

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

	//The function that is being repeated over and over again
	//every {frequency} time
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
				toggleTimer={this.toggleTimer}
			/>
			<span>{this.state.message}</span>

		  </div>

		);
  }
}
