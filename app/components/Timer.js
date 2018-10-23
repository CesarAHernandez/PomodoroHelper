import React from 'react';
import Button from '@material-ui/core/Button';


export default class Timer extends React.Component{
	

	render(){
		const { time } = this.props
		return(
			<div>
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
				<span>{time}</span>
			</div>

		)


	}

}	
