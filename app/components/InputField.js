import React from 'react';
import {TextField} from '@material-ui/core/';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import './main.scss';



export default class InputField extends React.Component{
	//TODO add remove feature in the indexfile


	renderTimeOptions = () =>{
		const {timeOptions} = this.props
			return ( 
				<div className='timeOptions'>
					{[...timeOptions].map((option,i) =>
						<TextField
							key={i}
							className="timeOption-field"
							label="Work Option"
							name="timeOptions"
							defaultValue={option}
							onChange={(e) => this.props.handleChange(e,i)}
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
				<div className='restOptions'>
					{[...restOptions].map((option,i) =>
						<TextField
							key={i}
							className="restOption-field"
							defaultValue={option}
							label="Rest Option"
							name="restOptions"
							onChange={(e) => this.props.handleChange(e,i)}
							margin="normal"
							variant="outlined"
						/>
					)}
				</div>
			)
	}

	render(){
		return(
			<div>
				<div id='optionController'>
					{this.renderTimeOptions()}
					<AddCircle className='addOption' onClick={this.props.addOption}/>
					<RemoveCircle className='removeOption' onClick={this.props.removeOption}/>
					{this.renderRestOptions()}
				</div>
			</div>

		)


	}

}	
