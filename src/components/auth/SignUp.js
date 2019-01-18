import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import Keys from '../../Keys'
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
		emailError: false,
		mobileMenuVisible: false
	}

	// component methods

	handleKeyDown = e => {
		const {
			fNameFreeze,
			lNameFreeze,
			emailFreeze
		} = this.state
		const key = e.key

		// if char limit for the field has been reached
		// and user tries to enter another char set
		// state to display an error message
		if (fNameFreeze && !Keys.list.includes(key)) {
			this.setState({ fNameError: true })
		}

		if (lNameFreeze && !Keys.list.includes(key)) {
			this.setState({ lNameError: true })
		}

		if (emailFreeze && !Keys.list.includes(key)) {
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

		// if form field is below char limit or if user types
		// an allowed key set state appropriately
		if (field === 'firstName') {
			if (!fNameFreeze || Keys.list.includes(key)) {
				this.setState({
					firstName: e.target.value,
					fNameChars: e.target.value.length
				})
			}
		} else if (field === 'lastName') {
			if (!lNameFreeze || Keys.list.includes(key)) {
				this.setState({
					lastName: e.target.value,
					lNameChars: e.target.value.length
				})
			}
		} else if (field === 'email') {
			if (!emailFreeze || Keys.list.includes(key)) {
				this.setState({
					email: e.target.value,
					emailChars: e.target.value.length
				})
			}
		} else if (field === 'password') {
			this.setState({ password: e.target.value })
		}
	}

	handleFocus = e => {
		const field = e.target.id

		// sets the field currently in focus and clears
		// any error messages when user focuses
		// on a form field
		this.setState({
			field,
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

	handleClick = e => {
		const { mobileMenuVisible } = this.state

		// if a mobile menu is open, still allow
		// click events so a click outside the 
		// menu will close it, but disable
		// the form so unintentional
		// submit events won't occur
		if (mobileMenuVisible) {
			e.preventDefault()
			this.setState({ mobileMenuVisible: false })
		}
	}

	// lifecycle hooks

	componentDidUpdate(prevProps, prevState) {
		const {
			fNameChars,
			lNameChars,
			emailChars,
			field
		} = this.state
		const { mobileNavVisible } = this.props

		// if user has entered or deleted anything in the
		// form call trackChars() and tell it which field
		// has changed
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

		// any time the mobile nav opens
		// track its status in state
		if (mobileNavVisible) {
			if (prevProps.mobileNavVisible !== mobileNavVisible) {
					this.setState({ mobileMenuVisible: true })
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
		const {
			auth,
			authError,
			mobileNavVisible
		} = this.props

		// conditional classNames to darken inactive
		// components when mobile nav is open
		const darkenForm = mobileNavVisible ? 'darken-form' : null
		const darkenButton = mobileNavVisible ? 'darken-button' : null

		if (auth.uid) return <Redirect to="/" />

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className={darkenForm}>
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
						<button className={`btn z-depth-0 ${darkenButton}`} onClick={this.handleClick}>
							Join
						</button>
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
	signUp: PropTypes.func.isRequired,
	mobileNavVisible: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
