/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 }* reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import messages from './messages';
import Timer from '../../components/Timer';
import InputField from '../../components/InputField';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
	// There should be a table to track which minutes the user is going to have
	// TODO MAYBE I can always disable the button if intervalRunning is true instead of showing the message
	//There are 1500 seconds in 25 minutes
	
	//timeOptions = [1500,1500,1500,1500]
	//restOptions = [900,900,900]
	FREQUENCY = 10
	state = {
		timeOptions: [1500,1400,1300,1200],
		restOptions: [900,900,900],
		time: 0,
		paused: true,
		onBreak: false,
		intervalRunning: false,
		timesRan: 0,
		message: '',
		option:'current',
	}
	componentWillMount(){
		this.setState({ time: this.state.timeOptions[0]})
	}
	intervalSet = (tickerFunction,frequency) => {
		if(!this.state.intervalRunning){
			this.timer = setInterval(tickerFunction, frequency)
			this.setState({intervalRunning: true})
		}
	}
	startTimer = () =>{
		//Shows that the user that you can only press the starte button once
		if(this.state.intervalRunning ){
			var message = this.state.message
			this.setState({message: 'You can only press the start once'})
			setTimeout( ()=>this.setState( {message} ),1000 )
			return
		}
		// The timer should go down 
		//this.setState({ time: this.state.timeOptions[0]})
		this.setState({intervalRunning: true,message:'Start working', paused: false})
		this.intervalSet(this.workTicker,this.FREQUENCY)

	}
	//Pause and resume timer SHOULD share the same button
	//For now i'm going to make them completely seperated
	//Toggle timer handles the pause and resume
	toggleTimer = () =>{
		if(this.state.time == 0){
			return
		}
		//not Paused
		if(!this.state.paused){
			console.log('paused')

			clearInterval(this.timer)
			this.setState({
				paused: true,
				message:'Timer is PAUSED',
				intervalRunning: false,
			})
		//Paused
		}else if(this.state.paused){
			console.log('resumed')
			if(this.state.onBreak){//Update the rest ticker
				this.intervalSet(this.restTicker, this.FREQUENCY)
				this.setState({paused: false, message:'',intervalRunning: true})
			}else if(!this.state.onBreak){//Update the work ticker
				this.intervalSet(this.workTicker,this.FREQUENCY)
				this.setState({paused: false, message:'',intervalRunning: true})
			}

		}
	}
	// Resets the timer to its current value
	resetTimer = () => {

		//Reset the current timer
		if(this.state.option == 'current'){
			clearInterval(this.timer)
			this.setState({
				time: this.state.timeOptions[this.state.timesRan],
				intervalRunning: false,
				message: '',
			})
		//Reset the full timer
		}else if(this.state.option == 'full'){
			try{
				clearInterval(this.timer)
				this.setState({
					intervalRunning: false,
					option: 'current',
					timesRan: 0,
					onBreak: false,
					time: this.state.timeOptions[0],
				})
			}catch(err){
				console.log('Error: ' + err)
			}
		}
	}

	//The function that is being repeated over and over again
	//every {frequency} time
	workTicker = () => {
		//When the timer is done running, then the times ran will update
		//Times ran will control which timer is going next
		try{
			if(this.state.time <= 1){
				//then we stop when the time runs out
				//TODO Show a message thet the pomodoro is finished and reset the timer
				if(this.state.timesRan == this.state.timeOptions.length - 1){
					clearInterval(this.timer)
					this.setState({
					message: 'You pomodoro has finished and the time has reset',
					option:'full'
					})
					this.resetTimer()
					return

				}else{
					this.setState({
						onBreak: true,
						intervalRunning: false,
						time: this.state.restOptions[this.state.timesRan],
					})
					clearInterval(this.timer)
					//TODO After a full times has gone by we should call restTicker
					setTimeout(this.intervalSet,2000,this.restTicker, this.FREQUENCY)
					return
				}
			}
			this.setState({time: this.state.time - 1,message:'Start Working'})

		}catch(err){
			this.setState({message: 'Work Ticker Error: '+ err})
		}

	}	
	restTicker = () => {
		//Make sure thet time is ran before timesRan so that we can get the correct value

		try{
			if(this.state.time <= 1){

				this.setState({
					timesRan: this.state.timesRan += 1,
					onBreak: false,
					intervalRunning: false,
				},() =>{ this.setState({time: this.state.timeOptions[this.state.timesRan]})})

				clearInterval(this.timer)
			//call the workTicker when restTime has run out
				setTimeout(this.intervalSet,2000,this.workTicker, this.FREQUENCY)
				return

			}
			this.setState({time: this.state.time - 1,message:'Take a rest'})

		}catch(err){

			this.setState({
				message: 'Rest Ticker Error:' + err
			})
		}

	}
	addTimeOptions = () => {

		this.setState({
			timeOptions:[...this.state.timeOptions,""] 
		})
	}
	addRestOptions = () => {
		//There always have to be 1 less rest option that time options


		if(this.state.restOptions.length + 1 < this.state.timeOptions.length){
			this.setState({
				restOptions:[...this.state.restOptions,""] 
			})
		}else{
			this.setState({
				timeOptions:[...this.state.timeOptions,""],
				restOptions:[...this.state.restOptions,""],
				message: 'You always have to have 1 less rest Options than timeoption'
			})
		}
	}
	handleChange = (e, key) =>{
		//this.setState([name]: event.target.value})
		//this.setState({[name]: [name][e.target.value]})
		//c
		if(e.target.name == 'timeOptions'){
			console.log('timeOptions '+ this.state.timeOptions[key])
			var timeOptions = this.state.timeOptions
			timeOptions[key] = e.target.value
			this.setState( {timeOptions} )
			console.log('timeOptions '+ this.state.timeOptions)
		} else if(e.target.name == 'restOptions'){
			console.log('restOptions ' + this.state.restOptions[key])
			var restOptions = this.state.restOptions
			restOptions[key] = e.target.value
			this.setState( {restOptions} )
			console.log('restOptions ' + this.state.restOptions[key])
		}


	}
	render() {

		const { time } = this.state

		return (

		  <div>
			<FormattedMessage {...messages.header} />
			<InputField 
				addTimeOptions={this.addTimeOptions}
				addRestOptions={this.addRestOptions}
				time={this.state.time}
				handleChange={this.handleChange}
				timeOptions={this.state.timeOptions}
				restOptions={this.state.restOptions}

			/>
			<Timer 
				paused={this.state.paused}
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
