import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class SignIn extends Component {

	state = {
		email: '',
		password: ''
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

	render() {
		const { auth, authError } = this.props

		if (auth.uid) return <Redirect to="/" />

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Sign In</h5>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" className="field" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" className="field" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn purple lighten-1 z-depth-0">Login</button>
					</div>
					<div className="red-text center">
						{ authError ? <p>{authError}</p> : null }
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
	authError: PropTypes.object,
	signIn: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
