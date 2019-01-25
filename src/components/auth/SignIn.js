import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class SignIn extends Component {

	state = {
		email: '',
		password: '',
		error: null,
		submitClicked: false,
		mobileMenuVisible: false
	}

	// component methods

	handleChange = e =>
		this.setState({
			[e.target.id]: e.target.value
		})

	handleSubmit = e => {
		e.preventDefault()

		this.setState({ submitClicked: true })

		this.props.signIn(this.state)
	}

	handleFocus = () => {
		// clear any error message when
		// user focuses on a form field
		this.setState({ error: null })
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

	componentDidUpdate(prevProps) {
		const {
			authError,
			mobileNavVisible
		} = this.props

		// if there is a new authError set it in state
		if (authError !== prevProps.authError) {
			this.setState({
				error: authError,
				submitClicked: false
			})
		}

		// if error in state is null and the component receives a
		// a different authError than before or a new occurance 
		// of the same authError set it in state
		if (!this.state.error
			&& authError
			&& authError !== prevProps.authError) {
				this.setState({
					error: authError,
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
			auth,
			authError,
			mobileNavVisible
		} = this.props
		const {
			error,
			submitClicked
		} = this.state

		// conditional classNames to darken inactive
		// components when mobile nav is open
		const disable = submitClicked ? 'disable' : null
		const darkenForm = mobileNavVisible ? 'darken-form' : null
		const darkenButton = mobileNavVisible || submitClicked ? 'darken-button' : null

		// send user to dashboard upon successful login
		if (auth.uid) return <Redirect to="/" />

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className={darkenForm}>
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
						<button
							className={`btn z-depth-0 ${disable} ${darkenButton}`}
							onClick={this.handleClick}
						>
							Login
						</button>
					</div>
					<div className="center">
						{ (submitClicked && !error) ? (
								<div className="loading-msg">
									<i className="fas fa-spinner fa-spin"></i>
									<span>        Posting up...</span>
								</div>
							) : (
								null
							)
						}
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
		code: PropTypes.string,
		message: PropTypes.string.isRequired
	}),
	signIn: PropTypes.func.isRequired,
	mobileNavVisible: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
