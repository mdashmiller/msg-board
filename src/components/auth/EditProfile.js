import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authUpdate, userUpdate } from '../../store/actions/authActions'

class EditProfile extends Component {

	state = {
		firstName: '',
		lastName: '',
		email: '',
		userError: false,
		emailError: false,
		userClicked: false,
		emailClicked: false,
		userSubmitted: false,
		emailSubmitted: false
	}

	// component methods

	handleSubmit = e => {
		const {
			firstName,
			lastName,
			email
		} = this.state

		if (e.target.id === 'user') {
			// check to see which form has
			// been submitted

			// set state so any authError will
			// display in the proper form
			this.setState({
				userClicked: true,
				emailClicked: false
			})

			if (!firstName || !lastName) {
				// make sure user has filled in all 
				// the form fields
				this.setState({ userError: true })
			} else {
				// call action creator
				this.props.userUpdate(firstName, lastName)
				this.submitted('user')
			}
		} else {
			this.setState({
				userClicked: false,
				emailClicked: true
			})

			if (!email) {
				this.setState({ emailError: true })
			} else {
				this.props.authUpdate(email)
				this.submitted('email')
			}
		}

		e.preventDefault()
	}

	submitted = type => {
		// shows a message to the user
		// upon successful update
		setTimeout(() => {
			// wait until the next tick and then check for any
			// error returned from the firestore update
			if (!this.props.authError) {
				// if there were no database errors then display
				// the success message for 2 seconds
				if (type === 'user') {
					this.setState({ userSubmitted: true })
					setTimeout(() => this.setState({ userSubmitted: false }), 2000)
				} else {
					this.setState({ emailSubmitted: true })
					setTimeout(() => this.setState({ emailSubmitted: false }), 2000)
				}
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
		// clears form error message when user
		// focuses on a form field again
		this.setState({
			userError: false,
			emailError: false,
			userClicked: false,
			emailClicked: false
		})
	}

	render() {
		const {
			userError,
			emailError,
			userClicked,
			emailClicked,
			userSubmitted,
			emailSubmitted
		} = this.state
		const { auth, authError } = this.props

		if (!auth.uid) return <Redirect to="/signin" />
			
		return (
			<div className="container">

				<form onSubmit={this.handleSubmit} id="user" className="white">
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
						<button className="btn purple lighten-1 z-depth-0">Update Profile</button>
						<div className="center red-text">
							{ userError && <p>Please complete all fields</p> }
							{ authError && userClicked && <p>{ authError }</p> }
						</div>
						<div className="center green-text">
							{ !authError && userSubmitted && <p>Profile successfully updated!</p> }
						</div>
					</div>
				</form>

				<form onSubmit={this.handleSubmit} id="email" className="white">
					<h5 className="grey-text text-darken-3">Update Email</h5>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" value={this.state.email}
							onFocus={this.handleFocus}
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<button className="btn purple lighten-1 z-depth-0">Update Email</button>
						<div className="center red-text">
							{ emailError && <p>Please enter a complete email address</p> }
							{ authError && emailClicked && <p>{ authError }</p> }
						</div>
						<div className="center green-text">
							{ !authError && emailSubmitted && <p>Email successfully updated!</p> }
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
