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
import Timer from '../../components/Timer';
import InputField from '../../components/InputField';
import './../../components/main.scss';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
	// There should be a table to track which minutes the user is going to have
	//There are 1500 seconds in 25 minutes
    //TODO Make sure to add an input that would let the user decide if he/she would like the time would be in seconds or in minutes
	
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
	};
	componentWillMount(){
		this.setState({ time: this.state.timeOptions[0]});
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
			this.setState({message: 'You can only press start once'})
			setTimeout( ()=>this.setState( {message} ),1000 )
			return
		}
		// The timer should go down 
		this.setState({ time: this.state.timeOptions[this.state.timesRan]})
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
				if(this.state.timesRan == this.state.timeOptions.length - 1){
					clearInterval(this.timer)
					this.setState({
					message: 'You pomodoro has finished and the time has reset',
					option:'full'
					})
					this.resetTimer()
                    this.sendAlert("The Pomodor Effect has finished")
					return

				}else{
					this.setState({
						onBreak: true,
						intervalRunning: false,
						time: this.state.restOptions[this.state.timesRan],
					})
					clearInterval(this.timer)
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
	addOption = () => {

		this.setState({
            timeOptions:[...this.state.timeOptions,""],
			restOptions:[...this.state.restOptions,""] 
		})

	}
    removeOption = () =>{
        console.log("WE are removing the time options")
        this.setState({
            timeOptions:[...this.state.timeOptions.slice(0,this.state.timeOptions.length-1)],
            restOptions:[...this.state.restOptions.slice(0,this.state.restOptions.length-1)]
        })


    }
	handleChange = (e, key) =>{
		//this.setState([name]: event.target.value})
		//this.setState({[name]: [name][e.target.value]})
		//c
		if(e.target.name == 'timeOptions'){

			var timeOptions = this.state.timeOptions
			timeOptions[key] = e.target.value
			this.setState( {timeOptions} )

		} else if(e.target.name == 'restOptions'){

			var restOptions = this.state.restOptions
			restOptions[key] = e.target.value
			this.setState( {restOptions} )

		}


	}
    sendAlert = (message) => {
        alert(message)
    }
	render() {
		return (
		  <div>
			  <div id="summary">
				<span className="header">Pomodoro Technique</span>
				<p>The Pomodore technique is to help you become more productive</p>
				<p>The usual times that people choose is 20mins work 5mins rest 20mins work 5mins rest 20mins work 15mins rest, then restart</p>
			  </div>
			<InputField 
				addOption={this.addOption}
				removeOption={this.removeOption}
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
