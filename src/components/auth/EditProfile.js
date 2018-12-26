import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authUpdate, userUpdate } from '../../store/actions/authActions'

class EditProfile extends Component {

	state = {
		firstName: '',
		lastName: '',
		email: '',
		error: false
	}

	// component methods

	handleSubmit = e => {
		const {
			firstName,
			lastName,
			email
		} = this.state

		if (!firstName || !lastName || !email) {
			this.setState({ error: true })
		} else {
			this.props.authUpdate(email)
			this.props.userUpdate(firstName, lastName)
			this.props.history.push('/')
		}
		e.preventDefault()
	}

	handleChange = e => 
		this.setState({
			[e.target.id]: e.target.value
		})

	handleFocus = e => {
		if (e.target.value === '') {
			this.setState({
				[e.target.id]: this.props[e.target.id]
			})
		}
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Edit Profile</h5>
					<div className="input-field">
						<label htmlFor="firstName">First Name</label>
						<input type="text" id="firstName" value={this.state.firstName}
							onFocus={this.handleFocus}
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="lastName">Last Name</label>
						<input type="text" id="lastName" value={this.state.lastName}
							onFocus={this.handleFocus}
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" value={this.state.email}
							onFocus={this.handleFocus}
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<button className="btn purple lighten-1 z-depth-0">Update</button>
					</div>
				{ this.state.error &&
					<div className="center red-text">
						<p>Please complete all fields</p>
					</div>
				}
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		firstName: state.firebase.profile.firstName,
		lastName: state.firebase.profile.lastName,
		email: state.firebase.auth.email
	}
}

const mapDispatchToProps = dispatch => {
	return {
		authUpdate: email => dispatch(authUpdate(email)),
		userUpdate: (firstName, lastName) => dispatch(userUpdate(firstName, lastName))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
