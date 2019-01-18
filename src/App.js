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
		// when the mobile notificatios panel
		// is open a class is added to other
		// components to make them inactive
		mobileNotesVisible: false
	}

	// component methods

	toggleMobileNotes = () =>
		// sets state to hide or show the
		// mobile notifications panel
		this.setState(prevState => {
			const { mobileNotesVisible } = prevState
			return {
				mobileNotesVisible: !mobileNotesVisible
			}
		})

	render() {
		const { mobileNotesVisible } = this.state
		const { auth } = this.props

		// creating a conditional class to darken inactive
		// elements when the mobile notifications
		// panel is open
		const darken = mobileNotesVisible ? 'darken' : null

		return (
			<BrowserRouter>
				  	<div className="App">
						<Navbar mobileNotesVisible={mobileNotesVisible} />

						{/* trigger to show or hide mobile
						notifications for logged-in users*/}
						{ auth.uid &&
							<div className="notes-trigger hide-on-large-only" onClick={this.toggleMobileNotes}>
								{mobileNotesVisible ? (
									<span className="notes-trigger">CLOSE</span>
								) : (
									<i className="notes-trigger material-icons">notifications</i>
								)}
							</div>
						}

						<div className={`main ${darken}`}>
							<Switch>
									<Route 
										exact path="/"
										render={() => <Dashboard mobileNotesVisible={mobileNotesVisible} />}
									/>
									<Route
										path="/post/:id"
										render={props => <PostDetails { ...props } mobileNotesVisible={mobileNotesVisible} />}
									/>
									<Route path="/signin" component={SignIn} />
									<Route path="/signup" component={SignUp} />
									<Route
										path="/create"
										render={props => <CreatePost { ...props } mobileNotesVisible={mobileNotesVisible} />}
									/>
									<Route 
										path="/edit"
										render={() => <EditHub mobileNotesVisible={mobileNotesVisible} />}
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
