import React, { Component } from 'react'

class EditProfile extends Component {

	state = {
		userName: '',
		picUrl: ''
	}

	// component methods

	handleSubmit = e => {
		console.log(this.state)
		e.preventDefault()
	}

	handleChange = e => 
		this.setState({
			[e.target.id]: e.target.value
		})

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Edit Profile</h5>
					<div className="input-field">
						<label htmlFor="userName">Username</label>
						<input type="text" id="userName" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="picUrl">Pic</label>
						<input type="text" id="picUrl" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn purple lighten-1 z-depth-0">Update</button>
					</div>
				</form>
			</div>
		)
	}

}

export default EditProfile
