import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import PostDetails from './components/posts/PostDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreatePost from './components/posts/CreatePost'
import EditHub from './components/auth/edit/EditHub'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// structure of application based on a tutorial
// series by Shuan Pelling
// https://www.youtube.com/watch?v=Oi4v5uxTY5o&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3

class App extends Component {

	state = {
		// when the mobile notificatios panel or mobile
		// nav is open a class is added to other
		// components to make them inactive
		mobileNavVisible: false,
		mobileNotesVisible: false
	}

	// component methods

	toggleMenu = type => {
		// set mobile nav or mobile notifications visibility
		// depending on what the user clicks
		if (type === 'nav') {
			this.setState(prevState => {
				const { mobileNavVisible } = prevState
				return {
					mobileNavVisible: !mobileNavVisible
				}
			})
		}
			
		if (type === 'notes') {
			// notifications bell will close mobile nav
			// if it is open
			if (this.state.mobileNavVisible) {
				this.setState({ mobileNavVisible: false })
			}

			this.setState(prevState => {
				const { mobileNotesVisible } = prevState
				return {
					mobileNotesVisible: !mobileNotesVisible
				}
			})
		}
	}

	handleClick = e => {
		const {
			mobileNavVisible,
			mobileNotesVisible
		} = this.state

		// if a mobile menu is open, close it when
		// user clicks anywhere in the main
		// content div
		if (mobileNavVisible || mobileNotesVisible) {
			if (this.node.contains(e.target)) {
				this.setState({
					mobileNavVisible: false,
					mobileNotesVisible: false
				})
			}
		}
	}

	// lifecycle hooks

	componentDidMount() {
		// listen for clicks in order to close an open
		// mobile menu if user clicks outside it
		document.addEventListener('click', this.handleClick)
	}

	render() {
		const { 
			mobileNavVisible,
			mobileNotesVisible 
		} = this.state
		const { auth } = this.props

		// creating conditional classes to darken inactive
		// elements when a mobile menu is open
		const darken = mobileNavVisible || mobileNotesVisible ? 'darken' : null
		const darkenBurger = mobileNotesVisible ? 'darken-burger' : null

		return (
			<BrowserRouter>
				  	<div className="App">
						<Navbar
							mobileNavVisible={mobileNavVisible}
							mobileNotesVisible={mobileNotesVisible}
							toggleMenu={this.toggleMenu}
						/>

						{/* burger button */}
						<button 
							className={`burger hide-on-large-only ${darkenBurger}`}
							onClick={() => this.toggleMenu('nav')}
						>
							<i className="material-icons">menu</i>
						</button>

						{/* trigger to show or hide mobile
						notifications for logged-in users */}
						{ auth.uid &&
							<div 
								className="notes-trigger hide-on-large-only" 
								onClick={() => this.toggleMenu('notes')}
							>
								{mobileNotesVisible ? (
									<span className="notes-trigger close">CLOSE</span>
								) : (
									<i className="notes-trigger material-icons">notifications</i>
								)}
							</div>
						}

						<div className={`main ${darken}`} ref={node => this.node = node}>
							<Switch>
									<Route 
										exact path="/"
										render={() => 
											<Dashboard 
												mobileNavVisible={mobileNavVisible}
												mobileNotesVisible={mobileNotesVisible}
											/>}
									/>
									<Route
										path="/post/:id"
										render={props =>
											<PostDetails
												{ ...props }
												mobileNavVisible={mobileNavVisible}
												mobileNotesVisible={mobileNotesVisible}
											/>}
									/>
									<Route
										path="/signin"
										render={() =>
											<SignIn
												mobileNavVisible={mobileNavVisible}
											/>}
									/>
									<Route
										path="/signup"
										render={() =>
											<SignUp
												mobileNavVisible={mobileNavVisible}
											/>}
									/>
									<Route
										path="/create"
										render={props =>
											<CreatePost
												{ ...props }
												mobileNavVisible={mobileNavVisible}
												mobileNotesVisible={mobileNotesVisible}
											/>}
									/>
									<Route 
										path="/edit"
										render={() =>
											<EditHub
												mobileNavVisible={mobileNavVisible}
												mobileNotesVisible={mobileNotesVisible}
											/>}
									/>
							</Switch>
						</div>
				  	</div>
			</BrowserRouter>
    	)
  	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth
	}
}

App.propTypes = {
	auth: PropTypes.shape({
		isEmpty: PropTypes.bool.isRequired,
		isLoaded: PropTypes.bool.isRequired
	}).isRequired
}

export default connect(mapStateToProps)(App)
