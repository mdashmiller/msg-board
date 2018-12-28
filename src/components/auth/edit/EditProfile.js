import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProfile } from '../../../store/actions/authActions'

class EditProfile extends Component {

	state = {
		firstName: '',
		lastName: '',
		formError: false,
		submitted: false
	}

	// component methods

	handleChange = e =>
		this.setState({
			[e.target.id]: e.target.value
		})

	handleFocus = e => {
		if (e.target.value === '') {
			// fills in the form field with focus with the current
			// value from the logged in user if the user hasn't
			// typed anything in the field yet
			this.setState({
				[e.target.id]: this.props[e.target.id]
			})
		}

		// clears error message when user
		// focuses on a form field
		this.setState({ formError: false })
	}

	handleSubmit = e => {
		const { firstName, lastName } = this.state

		if (!firstName || !lastName) {
			// make sure user has filled in all 
			// the form fields
			this.setState({ formError: true })
		} else {
			// call action creator
			new Promise(resolve => {
				this.props.editProfile(firstName, lastName)
				resolve()
			}).then(() => this.submitted())
		}

		e.preventDefault()
	}

	submitted = () => {
		// shows a message to the user
		// upon successful update
		if (!this.props.editProfileError) {
			this.setState({ submitted: true })
			setTimeout(() => this.setState({ submitted: false }), 2000)
		}
	}

	render() {
		const {
			firstName,
			lastName,
			formError,
			submitted
		} = this.state
		const { editProfileError } = this.props

		return (
			<form onSubmit={this.handleSubmit} id="user" className="white">
				<h5 className="grey-text text-darken-3">Edit Profile</h5>
				<div className="input-field">
					<label htmlFor="firstName">First Name</label>
					<input type="text" id="firstName" value={firstName}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="lastName">Last Name</label>
					<input type="text" id="lastName" value={lastName}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
					/>
				</div>
				<div className="input-field">
					<button className="btn purple lighten-1 z-depth-0">Update Profile</button>
					<div className="center red-text">
						{ formError && <p>Please complete all fields</p> }
						{ editProfileError && <p>{ editProfileError }</p> }
					</div>
					<div className="center green-text">
						{ !editProfileError && submitted && <p>Profile successfully updated!</p> }
					</div>
				</div>
			</form>
		)
	}
}

const mapStateToProps = state => {
	return {
		firstName: state.firebase.profile.firstName,
		lastName: state.firebase.profile.lastName,
		editProfileError: state.auth.editProfileError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		editProfile: (firstName, lastName) => dispatch(editProfile(firstName, lastName))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
