import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authUpdate } from '../../../store/actions/authActions'
import Keys from '../../../Keys'
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
		updateAuthError: null
	}

	// component methods

	handleKeyDown = e => {
		const { freezeEmail } = this.state
		const key = e.key

		// if char limit for the field has been reached
		// and user tries to enter another char set
		// state to display an error message
		if (freezeEmail && !Keys.list.includes(key)) {
			this.setState({ charError: true })
		}

		this.setState({ key })
	}

	handleChange = e => {
		const { key, freezeEmail } = this.state

		// if form field is below char limit or if user types
		// an allowed key set state appropriately
		if (!freezeEmail || Keys.list.includes(key)) {
			this.setState({
				email: e.target.value,
				chars: e.target.value.length
			})
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
		// focuses on a form field
		this.setState({
			charError: false,
			formError: false,
			submitClicked: false,
			submitSuccess: false,
			updateAuthError: null
		})
	}

	trackChars = () => {
		// set state to prohibit any input that exceeds
		// the specified number of chars
		if (this.state.chars === 320) {
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

	// lifecycle hooks

	componentDidUpdate(prevProps, prevState) {
		const {
			chars,
			updateAuthError,
			submitClicked
		} = this.state

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
			this.setState({ updateAuthError: this.props.updateAuthError })
		}

		// if updateAuthError in state is null and the component receives a
		// a different updateAuthError than before or a new occurance 
		// of the same updateAuthError set it in state
		if (!updateAuthError
			&& this.props.updateAuthError
			&& this.props.updateAuthError !== prevProps.updateAuthError) {
				this.setState({ updateAuthError: this.props.updateAuthError })
		}

		// if the user has clicked submit and there is no
		// updateAuthError tell the component the
		// update was a success
		if (!updateAuthError && submitClicked) {
			this.submitSuccess()
		}
	}

	render() {
		const {
			email,
			charError,
			formError,
			submitSuccess,
			updateAuthError
		} = this.state
		const {
			mobileNavVisible,
			mobileNotesVisible
		} = this.props
		
		// creating conditional classes to darken inactive
		// elements when the mobile notifications
		// panel or mobile nav is open
		const darkenForm = mobileNavVisible || mobileNotesVisible ? 'darken-form' : null
		const darkenButton = mobileNavVisible || mobileNotesVisible ? 'darken-button' : null

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
					<button className={`btn z-depth-0 ${darkenButton}`}>Update Email</button>
					<div className="center red-text">
						{ charError && <p>Max character limit reached</p> }
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
