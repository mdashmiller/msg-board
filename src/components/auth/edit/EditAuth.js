import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authUpdate } from '../../../store/actions/authActions'
import NotChars from '../../../NotChars'
import PropTypes from 'prop-types'

class EditAuth extends Component {

	state = {
		email: '',
		key: '',
		chars: 0,
		freezeEmail: false,
		charError: false,
		formError: false,
		submitClicked: false,
		submitSuccess: false,
		updateAuthError: null,
		mobileMenuVisible: false
	}

	// component methods

	handleKeyDown = e => {
		const { freezeEmail } = this.state
		const key = e.key

		// if char limit for the field has been reached
		// and user tries to enter another char set
		// state to display an error message
		if (freezeEmail && !NotChars.list.includes(key)) {
			this.setState({ charError: true })
		}

		this.setState({ key })
	}

	handleChange = e => {
		const { key, freezeEmail } = this.state
		const chars = e.target.value.length

		// if user attempts to paste-in something that exceeds the
		// char limit only display what fits in the limit, freeze
		// the input and display the appropriate error message
		if (chars > 320) {
			const email = e.target.value
			const truncatedEmail = email.substring(0, 320)

			this.setState({
				freezeEmail: true,
				charError: true,
				email: truncatedEmail,
				chars: 320
			})
		} else {
			// if form field is below char limit or if user types
			// a non-char key set state appropriately
			if (!freezeEmail || NotChars.list.includes(key)) {
				this.setState({
					email: e.target.value,
					chars: e.target.value.length
				})
			}
		}
	}

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
		// re-focuses on the form field
		this.setState({
			charError: false,
			formError: false,
			updateAuthError: null
		})
	}

	trackChars = () => {
		// set state to prohibit any input that exceeds
		// the specified number of chars
		if (this.state.chars >= 320) {
			this.setState({ freezeEmail: true })
		} else {
			this.setState({ freezeEmail: false })
		}
	}

	handleSubmit = e => {
		const { email } = this.state

		if (!email) {
			// make sure user has filled in all 
			// the form fields
			this.setState({ formError: true })
		} else {
			// call action creator and tell component
			// a submission has been made
			this.props.authUpdate(email)
			this.setState({ submitClicked: true })
		}

		e.preventDefault()
	}
		
	submitSuccess = () => {
		// display a temporary message upon
		// a successful update
		this.setState({
			submitClicked: false,
			submitSuccess: true
		})

		setTimeout(() => this.setState({ submitSuccess: false }), 2000)
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
			chars,
			updateAuthError,
			submitClicked
		} = this.state
		const {
			mobileNavVisible,
			mobileNotesVisible
		} = this.props

		// if user has entered or deleted anything in the
		// form call trackChars()
		if (prevState.chars !== chars) {
			this.trackChars()
		}

		// clear an existing char error if user deletes a char
		if (prevState.charError) {
			if (chars < 320) {
				this.setState({
					charError: false
				})
			}
		}
		
		// if there is a new updateAuthError set it in state
		if (this.props.updateAuthError !== prevProps.updateAuthError) {
			this.setState({
				updateAuthError: this.props.updateAuthError,
				submitClicked: false
			})
		}

		// if updateAuthError in state is null and the component receives a
		// a different updateAuthError than before or a new occurance 
		// of the same updateAuthError set it in state
		if (!updateAuthError
			&& this.props.updateAuthError
			&& this.props.updateAuthError !== prevProps.updateAuthError) {
				this.setState({
					updateAuthError: this.props.updateAuthError,
					submitClicked: false
				})
		}

		// if the user has clicked submit and there is no
		// updateAuthError tell the component the
		// update was a success
		if (!updateAuthError && submitClicked) {
			this.submitSuccess()
		}

		// any time a mobile menu opens
		// track its status in state
		if (mobileNavVisible || mobileNotesVisible) {
			if (prevProps.mobileNavVisible !== mobileNavVisible
				|| prevProps.mobileNotesVisible !== mobileNotesVisible) {
					this.setState({ mobileMenuVisible: true })
			}
		}
	}

	render() {
		const {
			email,
			charError,
			formError,
			submitClicked,
			submitSuccess,
			updateAuthError
		} = this.state
		const {
			mobileNavVisible,
			mobileNotesVisible
		} = this.props
		
		// conditional classNames to darken and
		// disable components
		const disable = submitClicked ? 'disable' : null
		const darkenForm = mobileNavVisible || mobileNotesVisible ? 'darken-form' : null
		const darkenButton = mobileNavVisible || mobileNotesVisible || submitClicked ? 'darken-button' : null

		return (
			<form onSubmit={this.handleSubmit} id="email" className={darkenForm}>
				<h4>Update Email</h4>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" className="field" value={email}
						onKeyDown={this.handleKeyDown}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
					/>
				</div>
				<div className="input-field">
					<button
						className={`btn z-depth-0 ${darkenButton} ${disable}`}
						onClick={this.handleClick}
					>
						Update Email
					</button>
					<div className="center">
						{ (submitClicked && !updateAuthError) ? (
								<div className="loading-msg">
									<i className="fas fa-spinner fa-spin"></i>
									<span>        Updating...</span>
								</div>
							) : (
								null
							)
						}
					</div>
					<div className="center red-text">
						{ charError && <p>Email cannot exceed 320 characters</p> }
						{ formError && <p>Please enter a complete email address</p> }
						{ updateAuthError && <p>{ updateAuthError.message }</p> }
					</div>
					<div className="center green-text">
						{ !updateAuthError && submitSuccess && <p>Email successfully updated!</p> }
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

EditAuth.propTypes = {
	email: PropTypes.string,
	updateAuthError: PropTypes.shape({
		code: PropTypes.string,
		message: PropTypes.string.isRequired
	}),
	authUpdate: PropTypes.func.isRequired,
	mobileNavVisible: PropTypes.bool.isRequired,
	mobileNotesVisible: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAuth)
