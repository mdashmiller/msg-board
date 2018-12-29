import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authUpdate } from '../../../store/actions/authActions'
import PropTypes from 'prop-types'

class EditAuth extends Component {

	state = {
		email: '',
		formError: false,
		submitClicked: false,
		submitSuccess: false,
		updateAuthError: null
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
			updateAuthError: null
		})
	}

	handleSubmit = e => {
		const { email } = this.state

		if (!email) {
			// make sure user has filled in all 
			// the form fields
			this.setState({ formError: true })
		} else {
			// call action creator
			this.props.authUpdate(email)
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
		if (this.props.updateAuthError !== prevProps.updateAuthError) {
			// if there is a new updateAuthError set it in state
			this.setState({ updateAuthError: this.props.updateAuthError })
		}

		if (!this.state.updateAuthError
			&& this.props.updateAuthError
			&& this.props.updateAuthError !== prevProps.updateAuthError) {
				// if updateAuthError in state is null and the component receives a
				// a different updateAuthError than before or a new occurance 
				// of the same updateAuthError set it in state
				this.setState({ updateAuthError: this.props.updateAuthError })
		}

		if (!this.state.updateAuthError && this.state.submitClicked) {
			// if the user has clicked submit and there is no
			// updateAuthError tell the component the
			// update was a success
			this.submitSuccess()
		}
	}

	render() {
		const {
			email,
			formError,
			submitSuccess,
			updateAuthError
		} = this.state

		return (
			<form onSubmit={this.handleSubmit} id="email" className="white">
				<h5 className="grey-text text-darken-3">Update Email</h5>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" className="field" value={email}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
					/>
				</div>
				<div className="input-field">
					<button className="btn purple lighten-1 z-depth-0">Update Email</button>
					<div className="center red-text">
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
	authUpdate: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAuth)
