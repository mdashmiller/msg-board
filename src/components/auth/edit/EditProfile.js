import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProfile } from '../../../store/actions/authActions'
import Keys from '../../../Keys'
import PropTypes from 'prop-types'

class EditProfile extends Component {

	state = {
		firstName: '',
		lastName: '',
		key: '',
		field: '',
		fNameChars: 0,
		lNameChars: 0,
		fNameFreeze: false,
		lNameFreeze: false,
		fNameError: false,
		lNameError: false,
		formError: false,
		submitClicked: false,
		submitSuccess: false,
		editProfileError: null
	}

	// component methods

	handleKeyDown = e => {
		const {
			fNameFreeze,
			lNameFreeze
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

		this.setState({ key })
	}

	handleChange = e => {
		const { key, fNameFreeze, lNameFreeze } = this.state
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
		} else {
			if (!lNameFreeze || Keys.list.includes(key)) {
				this.setState({
					lastName: e.target.value,
					lNameChars: e.target.value.length
				})
			}
		}
	}

	handleFocus = e => {
		const field = e.target.id

		if (e.target.value === '') {
			// fills in the form field with focus with the current
			// value from the logged in user if the user hasn't
			// typed anything in the field yet
			this.setState({
				[field]: this.props[field]
			})
		}

		// sets the field currently in focus and clears
		// any error messages when user focuses
		// on a form field
		this.setState({
			field,
			fNameError: false,
			lNameError: false,
			formError: false,
			submitClicked: false,
			submitSuccess: false,
			editProfileError: null
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
			default:
				return
		}
	}

	handleSubmit = e => {
		const { firstName, lastName } = this.state

		if (!firstName || !lastName) {
			// make sure user has filled in all 
			// the form fields
			this.setState({ formError: true })
		} else {
			// call action creator
			this.props.editProfile(firstName, lastName)
			this.setState({ submitClicked: true })
		}

		e.preventDefault()
	}

	submitSuccess = () => {
		// show temporary message upon
		// successful submission
		this.setState({
			submitClicked: false,
			submitSuccess: true
		})

		setTimeout(() => this.setState({ submitSuccess: false }), 2000)
	}

	// lifecycle hooks

	componentDidUpdate(prevProps, prevState) {
		const {
			fNameChars,
			lNameChars,
			field,
			editProfileError,
			submitClicked
		} = this.state

		// if user has entered or deleted anything in the
		// form call trackChars() and tell it which field
		// has changed
		if (prevState.fNameChars !== fNameChars) {
			this.trackChars('firstName')
		} else if (prevState.lNameChars !== lNameChars) {
			this.trackChars('lastName')
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
		}

		// if there is a new editProfileError set it in state
		if (this.props.editProfileError !== prevProps.editProfileError) {
			this.setState({ editProfileError: this.props.editProfileError })
		}

		// if editProfileError in state is null and the component receives a
		// a different editProfileError than before or a new occurance 
		// of the same editProfileError set it in state
		if (!editProfileError
			&& this.props.editProfileError
			&& this.props.editProfileError !== prevProps.editProfileError) {
				this.setState({ editProfileError: this.props.editProfileError })
		}

		// if the user has clicked submit and there is no
		// editProfileError tell the component the
		// update was a success
		if (!editProfileError && submitClicked) {
			this.submitSuccess()
		}
	}

	render() {
		const {
			firstName,
			lastName,
			fNameError,
			lNameError,
			formError,
			submitSuccess,
			editProfileError 
		} = this.state
		const { mobileNotesVisible } = this.props

		// creating conditional classes to darken inactive
		// elements when the mobile notifications
		// panel is open
		const darkenForm = mobileNotesVisible ? 'darken-form' : null
		const darkenButton = mobileNotesVisible ? 'darken-button' : null

		return (
			<form onSubmit={this.handleSubmit} id="user" className={darkenForm}>
				<h4>Edit Profile</h4>
				<div className="input-field">
					<label htmlFor="firstName">First Name</label>
					<input type="text" id="firstName" className="field" value={firstName}
						onKeyDown={this.handleKeyDown}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="lastName">Last Name</label>
					<input type="text" id="lastName" className="field" value={lastName}
						onKeyDown={this.handleKeyDown}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
					/>
				</div>
				<div className="input-field">
					<button className={`btn z-depth-0 ${darkenButton}`}>Update Profile</button>
					<div className="center red-text">
						{ fNameError || lNameError ? (
							<p>Max character limit reached</p>
						) : (
							null
						)}
						{ formError && <p>Please complete all fields</p> }
						{ editProfileError && <p>{ editProfileError.message }</p> }
					</div>
					<div className="center green-text">
						{ !editProfileError && submitSuccess && <p>Profile successfully updated!</p> }
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

EditProfile.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	editProfileError: PropTypes.shape({
		code: PropTypes.string,
		message: PropTypes.string.isRequired,
	}),
	editProfile: PropTypes.func.isRequired,
	mobileNotesVisible: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
