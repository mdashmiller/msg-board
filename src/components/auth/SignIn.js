import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class SignIn extends Component {

	state = {
		email: '',
		password: '',
		error: null
	}

	// component methods

	handleChange = e =>
		this.setState({
			[e.target.id]: e.target.value
		})

	handleSubmit = e => {
		e.preventDefault()
		this.props.signIn(this.state)
	}

	handleFocus = () => {
		// clear any error message when
		// user focuses on a form field
		this.setState({ error: null })
	}

	// lifecycle hooks

	componentDidUpdate(prevProps) {
		// if there is a new authError set it in state
		if (this.props.authError !== prevProps.authError) {
			this.setState({ error: this.props.authError })
		}

		// if error in state is null and the component receives a
		// a different authError than before or a new occurance 
		// of the same authError set it in state
		if (!this.state.error
			&& this.props.authError
			&& this.props.authError !== prevProps.authError) {
				this.setState({ error: this.props.authError })
		}
	}

	render() {
		const { auth, authError } = this.props
		const { error } = this.state

		if (auth.uid) return <Redirect to="/" />

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<h4>Sign In</h4>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" className="field"
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" className="field"
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<button className="btn purple lighten-1 z-depth-0">Login</button>
					</div>
					<div className="red-text center">
						{ error ? <p>{authError.message}</p> : null }
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
		signIn: credentials => dispatch(signIn(credentials))
	}
}

SignIn.propTypes = {
	auth: PropTypes.shape({
		isEmpty: PropTypes.bool.isRequired,
		isLoaded: PropTypes.bool.isRequired
	}).isRequired,
	authError: PropTypes.shape({
		code: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired
	}),
	signIn: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
