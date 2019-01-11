import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProfile } from '../../../store/actions/authActions'
import PropTypes from 'prop-types'

class EditProfile extends Component {

	state = {
		firstName: '',
		lastName: '',
		formError: false,
		submitClicked: false,
		submitSuccess: false,
		editProfileError: null
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
		this.setState({
			formError: false,
			submitClicked: false,
			submitSuccess: false,
			editProfileError: null
		})
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
		this.setState({
			submitClicked: false,
			submitSuccess: true
		})
		setTimeout(() => this.setState({ submitSuccess: false }), 2000)
	}

	// lifecycle hooks

	componentDidUpdate(prevProps, prevState) {
		if (this.props.editProfileError !== prevProps.editProfileError) {
			// if there is a new editProfileError set it in state
			this.setState({ editProfileError: this.props.editProfileError })
		}

		if (!this.state.editProfileError
			&& this.props.editProfileError
			&& this.props.editProfileError !== prevProps.editProfileError) {
				// if editProfileError in state is null and the component receives a
				// a different editProfileError than before or a new occurance 
				// of the same editProfileError set it in state
				this.setState({ editProfileError: this.props.editProfileError })
		}

		if (!this.state.editProfileError && this.state.submitClicked) {
			// if the user has clicked submit and there is no
			// editProfileError tell the component the
			// update was a success
			this.submitSuccess()
		}
	}

	render() {
		const {
			firstName,
			lastName,
			formError,
			submitSuccess,
			editProfileError 
		} = this.state

		return (
			<form onSubmit={this.handleSubmit} id="user">
				<h5 className="grey-text text-darken-3">Edit Profile</h5>
				<div className="input-field">
					<label htmlFor="firstName">First Name</label>
					<input type="text" id="firstName" className="field" value={firstName}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="lastName">Last Name</label>
					<input type="text" id="lastName" className="field" value={lastName}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
					/>
				</div>
				<div className="input-field">
					<button className="btn z-depth-0">Update Profile</button>
					<div className="center red-text">
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
	editProfile: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
