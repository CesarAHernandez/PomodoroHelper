import React from 'react';
import {Icon, TextField} from '@material-ui/core/';
import AddCircle from '@material-ui/icons/AddCircle';
//import './main.scss';


export default class InputField extends React.Component{
	//TODO add a button so that i can add more 
	//TODO going to do flex-blox for the TextField


	renderTimeOptions = () =>{
		const {timeOptions} = this.props
			return ( 
				<div>
					{[...timeOptions].map((option,i) =>
						<TextField
							key={i}
							className="timeOptions-field"
							label="Work Option"
							name="timeOptions"
							onChange={(e) => {this.props.handleChange(e,i)}}
							margin="normal"
							variant="outlined"
						/>
					)}
				</div>
			)
	}
	renderRestOptions = () => {
		const {restOptions} = this.props
			return ( 
				<div>
					{[...restOptions].map((option,i) =>
						<TextField
							key={i}
							className="timeOptions-field"
							label="Rest Option"
							name="restOptions"
							onChange={(e) => {this.props.handleChange(e,i)}}
							margin="normal"
							variant="outlined"
						/>
					)}
				</div>
			)
	}

	render(){
		const { time,handleChange } = this.props
		return(
			<div>
				<div >
					<AddCircle onClick={this.props.addOptions}/>
					<form noValidate autoComplete='off'>
						{this.renderTimeOptions()}
					</form>
					<AddCircle onClick={this.props.addOptions}/>
					<form noValidate autoComplete='off' >
						{this.renderRestOptions()}
					</form>

				</div>
			</div>

		)


	}

}	
