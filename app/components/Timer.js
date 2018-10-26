import React from 'react';
import {Button, TextField} from '@material-ui/core/';
import './main.scss';


export default class Timer extends React.Component{
	
	// refactor the time so that it is in the format of minutes:seconds
	refactorTime = (seconds) => {
		var minutes = Math.floor(seconds / 60)
		var remainingSeconds = seconds % 60

		return  minutes + ':' + remainingSeconds
	}
	formatButtons = (time) => {
		const {paused} = this.props


		if(!paused){
			return (
				<div id="controller">
					<Button variant="outlined" 
						color="secondary" 
						onClick={this.props.toggleTimer}>
						Resume	
					</Button>
					<span className='timer' >{this.refactorTime(time)}</span>
				</div>
				)
		}else{
			return (
				<div id="controller">
					<Button variant="outlined"
						color="secondary" 
						onClick={this.props.startTimer}>
						Start Timer
					</Button>
					<Button variant="outlined" 
						color="secondary" 
						onClick={this.props.resetTimer}>
						Reset Timer
					</Button>
					<span className='timer' >{this.refactorTime(time)}</span>
				</div>
			)
		}


	}

	render(){
		const { time } = this.props
		return(
			<div>
				{this.formatButtons(time)}
			</div>

		)


	}

}	
