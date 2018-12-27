import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authUpdate, userUpdate } from '../../store/actions/authActions'

class EditProfile extends Component {

	state = {
		firstName: '',
		lastName: '',
		email: '',
		formError: false,
		submitted: false
	}

	// component methods

	handleSubmit = e => {
		const {
			firstName,
			lastName,
			email
		} = this.state

		if (!firstName || !lastName || !email) {
			// make sure user has filled in all 
			// the form fields
			this.setState({ formError: true })
		} else {
			// call action creators
			this.props.authUpdate(email)
			this.props.userUpdate(firstName, lastName)
			this.submitted()
		}

		e.preventDefault()
	}

	submitted = () => {
		// shows a message to the user
		// upon successful update
		setTimeout(() => {
			// wait until the next tick and then check for any
			// error returned from the firestore update
			if (!this.props.authError) {
				// if there were no database errors then display
				// the success message for 2 seconds
				this.setState({ submitted: true })
				setTimeout(() => this.setState({ submitted: false }), 2000)
			}
		})
	}

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
		// clears formError message when user
		// focuses on a form field again
		this.setState({ formError: false })
	}

	render() {
		const { formError, submitted } = this.state
		const { auth, authError } = this.props

		if (!auth.uid) return <Redirect to="/signin" />

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
						<div className="center red-text">
							{ formError && <p>Please complete all fields</p> }
							{ authError &&
								<div>
									<p>We're having a little trouble on our end</p>
									<p>Please try again later</p>
								</div>
							}
						</div>
						<div className="center green-text">
							{ !authError && submitted && <p>Profile successfully updated!</p> }
						</div>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return {
		auth: state.firebase.auth,
		firstName: state.firebase.profile.firstName,
		lastName: state.firebase.profile.lastName,
		email: state.firebase.auth.email,
		authError: state.auth.authError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		authUpdate: email => dispatch(authUpdate(email)),
		userUpdate: (firstName, lastName) => dispatch(userUpdate(firstName, lastName))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
