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
		key: '',
		field: '',
		emailChars: 0,
		fNameChars: 0,
		lNameChars: 0,
		emailFreeze: false,
		fNameFreeze: false,
		lNameFreeze: false,
		formError: false,
		fNameError: false,
		lNameError: false,
		emailError: false
	}

	// component methods

	handleKeyDown = e => {
		const {
			fNameFreeze,
			lNameFreeze,
			emailFreeze
		} = this.state
		const key = e.key

		// if char limit for the field has been
		// reached, set state to display
		// an error message
		if (fNameFreeze && key !== 'Backspace') {
			this.setState({ fNameError: true })
		} else if (lNameFreeze && key !== 'Backspace') {
			this.setState({ lNameError: true })
		} else if (emailFreeze && key !== 'Backspace') {
			this.setState({ emailError: true })
		}

		this.setState({ key })
	}

	handleChange = e => {
		const {
			key,
			emailFreeze,
			fNameFreeze,
			lNameFreeze
		} = this.state
		const field = e.target.id

		// if form field is below char limit or if user
		// deletes a char set state appropriately
		if (field === 'firstName') {
			if (!fNameFreeze || key === 'Backspace') {
				this.setState({
					firstName: e.target.value,
					fNameChars: e.target.value.length
				})
			}
		} else if (field === 'lastName') {
			if (!lNameFreeze || key === 'Backspace') {
				this.setState({
					lastName: e.target.value,
					lNameChars: e.target.value.length
				})
			}
		} else if (field === 'email') {
			if (!emailFreeze || key === 'Backspace') {
				this.setState({
					email: e.target.value,
					emailChars: e.target.value.length
				})
			}
		} else if (field === 'password') {
			this.setState({ password: e.target.value })
		}
	}
		
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
			// capitalize first letters of name for consistency
			const formattedFName = firstName[0].toUpperCase() + firstName.substring(1)
			const formattedLName = lastName[0].toUpperCase() + lastName.substring(1)
			this.setState({
				firstName: formattedFName,
				lastName: formattedLName
			})

			// allow state to update and
			// then call action creator
			setTimeout(() => this.props.signUp(this.state))
		}

		e.preventDefault()
	}

	handleFocus = e => {
		const field = e.target.id
		this.setState({ field })

		// clears any error messages when user
		// focuses on a form field again
		this.setState({
			formError: false,
			fNameError: false,
			lNameError: false,
			emailError: false
		})
	}

	trackChars = field => {
		// set state to prohibit any input in
		// a form field that exceeds the
		// specified number of chars
		switch (field) {
			case 'firstName':
				this.state.fNameChars === 16 ? (
					this.setState({ fNameFreeze: true })
				) : (
					this.setState({ fNameFreeze: false })
				)
				break
			case 'lastName':
				this.state.lNameChars === 16 ? (
					this.setState({ lNameFreeze: true })
				) : (
					this.setState({ lNameFreeze: false })
				)
				break
			case 'email':
				this.state.emailChars === 320 ? (
					this.setState({ emailFreeze: true })
				) : (
					this.setState({ emailFreeze: false })
				)
				break
			default:
				return
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// if user has entered or deleted anything in the
		// form call trackChars() and tell it which field
		// has changed
		const {
			fNameChars,
			lNameChars,
			emailChars,
			field
		} = this.state

		if (prevState.fNameChars !== fNameChars) {
			this.trackChars('firstName')
		} else if (prevState.lNameChars !== lNameChars) {
			this.trackChars('lastName')
		} else if (prevState.emailChars !== emailChars) {
			this.trackChars('email')
		}

		// clear an existing field error if user deletes a
		// char from that field or focuses away from it
		if (prevState.fNameError) {
			if (fNameChars < 16 || field !== 'firstName') {
				this.setState({
					fNameError: false
				})
			}
		} else if (prevState.lNameError) {
			if (lNameChars < 16 || field !== 'lastName') {
				this.setState({
					lNameError: false
				})
			}
		} else if (prevState.emailError) {
			if (emailChars < 320 || field !== 'email') {
				this.setState({
					emailError: false
				})
			}
		}
	}

	render() {
		const {
			formError,
			fNameError,
			lNameError,
			emailError
		} = this.state
		const { auth, authError } = this.props

		if (auth.uid) return <Redirect to="/" />
console.log('firstName: ', this.state.firstName)
console.log('lastName: ', this.state.lastName)
console.log('email: ', this.state.email)
console.log('password: ', this.state.password)
console.log('formError: ', formError)
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<h4>Sign Up</h4>
					<div className="input-field">
						<label htmlFor="firstName">First Name</label>
						<input type="text" id="firstName" className="field"
							value={this.state.firstName}
							onKeyDown={this.handleKeyDown}
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="lastName">Last Name</label>
						<input type="text" id="lastName" className="field"
							value={this.state.lastName}
							onKeyDown={this.handleKeyDown}
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" className="field"
							value={this.state.email}
							onKeyDown={this.handleKeyDown}
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" className="field"
							value={this.state.password}
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<button className="btn purple lighten-1 z-depth-0">Join</button>
						<div className="red-text center">
							{ authError && <p>{ authError }</p> }
							{ formError && <p>Please complete all fields</p> }
							{ (fNameError || lNameError || emailError) ? (
									<p>Max character limit reached</p>
								) : (
									null
								)
							}
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
