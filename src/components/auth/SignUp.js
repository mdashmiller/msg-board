import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import NotChars from '../../NotChars'
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
		signUpError: null,
		submitClicked: false,
		mobileMenuVisible: false
	}

	// component methods

	handleKeyDown = e => {
		const {
			field,
			fNameFreeze,
			lNameFreeze,
			emailFreeze
		} = this.state
		const key = e.key

		// determine form field user is using
		if (field === 'firstName') {
			// if char limit for the field has been reached
			// and user tries to enter another char set
			// state to display an error message
			if (fNameFreeze && !NotChars.list.includes(key)) {
				this.setState({ fNameError: true })
			}
		} else if (field === 'lastName') {
			if (lNameFreeze && !NotChars.list.includes(key)) {
				this.setState({ lNameError: true })
			}
		} else if (field === 'email') {
			if (emailFreeze && !NotChars.list.includes(key)) {
				this.setState({ emailError: true })
			}
		}

		this.setState({ key })
	}

	handleChange = e => {
		const {
			field,
			key,
			emailFreeze,
			fNameFreeze,
			lNameFreeze
		} = this.state
		const chars = e.target.value.length

		// determine which form field is being used
		if (field === 'firstName') {
			// if user attempts to paste-in something that exceeds the
			// char limit only display what fits in the limit, freeze
			// the input and display the appropriate error message
			if (chars > 16) {
				const fName = e.target.value
				const truncatedFName = fName.substring(0, 16)

				this.setState({
					fNameFreeze: true,
					fNameError: true,
					firstName: truncatedFName,
					fNameChars: 16
				})
			} else {
				// if char limit has not been exceeded or the user pushes
				// a key from the NotChars list (backspace, arrows, etc.)
				// take the user's input
				if (!fNameFreeze || NotChars.list.includes(key)) {
					this.setState({
						firstName: e.target.value,
						fNameChars: chars
					})
				}
			}
		} else if (field === 'lastName') {
			if (chars > 16) {
				const lName = e.target.value
				const truncatedLName = lName.substring(0, 16)

				this.setState({
					lNameFreeze: true,
					lNameError: true,
					lastName: truncatedLName,
					lNameChars: 16
				})
			} else {
				if (!lNameFreeze || NotChars.list.includes(key)) {
					this.setState({
						lastName: e.target.value,
						lNameChars: chars
					})
				}
			}
		} else if (field === 'email') {
			if (chars > 320) {
				const email = e.target.value
				const truncatedEmail = email.substring(0, 320)

				this.setState({
					emailFreeze: true,
					emailError: true,
					email: truncatedEmail,
					emailChars: 320
				})
			} else {
				if (!emailFreeze || NotChars.list.includes(key)) {
					this.setState({
						email: e.target.value,
						emailChars: chars
					})
				}
			}
		// field is password
		} else {
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
			emailError: false,
			signUpError: null
		})
	}

	trackChars = field => {
		// set state to prohibit any input in
		// a form field that exceeds the
		// specified number of chars
		switch (field) {
			case 'firstName':
				this.state.fNameChars >= 16 ? (
					this.setState({ fNameFreeze: true })
				) : (
					this.setState({ fNameFreeze: false })
				)
				break
			case 'lastName':
				this.state.lNameChars >= 16 ? (
					this.setState({ lNameFreeze: true })
				) : (
					this.setState({ lNameFreeze: false })
				)
				break
			case 'email':
				this.state.emailChars >= 320 ? (
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
			// call action creator and tell component
			// a submission has been made
			this.props.signUp(this.state)
			this.setState({ submitClicked: true })
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
			field,
			signUpError
		} = this.state
		const {
			mobileNavVisible,
			authError
		} = this.props

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

		// if there is a new authError set it in state
		if (authError !== prevProps.authError) {
			this.setState({
				signUpError: authError,
				submitClicked: false
			})
		}

		// if signUpError in state is null and the component receives a
		// a different authError than before or a new occurance 
		// of the same authError set it in state
		if (!signUpError
			&& authError
			&& authError !== prevProps.authError) {
				this.setState({
					signUpError: authError,
					submitClicked: false
				})
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
			emailError,
			signUpError,
			submitClicked
		} = this.state
		const {
			auth,
			mobileNavVisible
		} = this.props
		
		// conditional classNames to darken and
		// disable components
		const darken = submitClicked ? 'darken' : null
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
						<button className={`btn z-depth-0 ${darken} ${darkenButton}`} onClick={this.handleClick}>
							Join
						</button>
						<div className="red-text center">
							{ fNameError && <p>First name cannot exceed 16 characters</p> }
							{ lNameError && <p>Last name cannot exceed 16 characters</p> }
							{ emailError && <p>Email cannot exceed 320 characters</p> }
							{ formError && <p>Please complete all fields</p> }
							{ signUpError && <p>{ signUpError.message }</p> }
						</div>
						<div className="center">
							{ (submitClicked && !signUpError) ? (
									<div className="loading-msg">
										<i className="fas fa-spinner fa-spin"></i>
										<span>        Posting up...</span>
									</div>
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
