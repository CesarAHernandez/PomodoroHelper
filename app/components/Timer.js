import React from 'react';
import Button from '@material-ui/core/Button';
import './main.scss';


export default class Timer extends React.Component{
	
	// refactor the time so that it is in the format of minutes:seconds
	refactorTime = (seconds) => {
		var minutes = Math.floor(seconds / 60)
		var remainingSeconds = seconds % 60

		return  minutes + ':' + remainingSeconds
	}

	render(){
		const { time } = this.props
		return(
			<div>
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
					<Button variant="outlined" 
						color="secondary" 
						onClick={this.props.toggleTimer}>
						Pause/Resume	
					</Button>
					<span className='timer' >{this.refactorTime(time)}</span>
				</div>
			</div>

		)


	}

}	
