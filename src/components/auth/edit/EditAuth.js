import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authUpdate } from '../../../store/actions/authActions'

class EditAuth extends Component {

	state = {
		email: '',
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
		const { email } = this.state

		if (!email) {
			// make sure user has filled in all 
			// the form fields
			this.setState({ formError: true })
		} else {
			// call action creator
			new Promise(resolve => {
				this.props.authUpdate(email)
				resolve()
			}).then(() => this.submitted())
		}

		e.preventDefault()
	}

	submitted = () => {
		// shows a message to the user
		// upon successful update
		if (!this.props.updateAuthError) {
			this.setState({ submitted: true })
			setTimeout(() => this.setState({ submitted: false }), 2000)
		}
	}

	render() {
		const {
			email,
			formError,
			submitted
		} = this.state
		const { updateAuthError } = this.props

		return (
			<form onSubmit={this.handleSubmit} id="email" className="white">
				<h5 className="grey-text text-darken-3">Update Email</h5>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" value={email}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
					/>
				</div>
				<div className="input-field">
					<button className="btn purple lighten-1 z-depth-0">Update Email</button>
					<div className="center red-text">
						{ formError && <p>Please enter a complete email address</p> }
						{ updateAuthError && <p>{ updateAuthError }</p> }
					</div>
					<div className="center green-text">
						{ !updateAuthError && submitted && <p>Email successfully updated!</p> }
					</div>
				</div>
			</form>
		)
	}
}

const mapStateToProps = state => {
	return {
		email: state.firebase.auth.email,
		updateAuthError: state.auth.updateAuthError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		authUpdate: (firstName, lastName) => dispatch(authUpdate(firstName, lastName))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAuth)
