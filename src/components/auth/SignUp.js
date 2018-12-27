import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import PropTypes from 'prop-types'

class SignUp extends Component {

	state = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		formError: false
	}

	// component methods

	handleChange = e =>
		this.setState({
			[e.target.id]: e.target.value
		})

	handleSubmit = e => {
		const {
			email,
			password,
			firstName,
			lastName
		} = this.state

		if (!email || !password || !firstName || !lastName) {
			// make sure user has filled in all 
			// the form fields
			this.setState({ formError: true })
		} else {
			// call action creator
			this.props.signUp(this.state)
		}

		e.preventDefault()
	}

	handleFocus = () => {
		// clears formError message when user
		// focuses on a form field again
		this.setState({ formError: false })
	}

	render() {
		const { formError } = this.state
		const { auth, authError } = this.props

		if (auth.uid) return <Redirect to="/" />

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Sign Up</h5>
					<div className="input-field">
						<label htmlFor="firstName">First Name</label>
						<input type="text" id="firstName"
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="lastName">Last Name</label>
						<input type="text" id="lastName"
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email"
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password"
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<button className="btn purple lighten-1 z-depth-0">Join</button>
						<div className="red-text center">
							{ authError && <p>{ authError }</p> }
							{ formError && <p>Please complete all fields</p> }
						</div>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		authError: state.auth.authError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signUp: newUser => dispatch(signUp(newUser))
	}
}

SignUp.propTypes = {
	auth: PropTypes.shape({
		isEmpty: PropTypes.bool.isRequired,
		isLoaded: PropTypes.bool.isRequired
	}).isRequired,
	authError: PropTypes.object,
	signUp: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
