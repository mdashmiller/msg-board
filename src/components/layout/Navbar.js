import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import DesktopSignedInLinks from './desktop/DesktopSignedInLinks'
import DesktopSignedOutLinks from './desktop/DesktopSignedOutLinks'
import MobileSignedInLinks from './mobile/MobileSignedInLinks'
import MobileSignedOutLinks from './mobile/MobileSignedOutLinks'
import { connect } from 'react-redux'

class Navbar extends Component {
	 
	 state = {
	 	sideNavVisible: false
	 }

	 // component methods

	 showOrHideMenu = () =>
	 	// sets state to hide or show the
	 	// mobile drop-down nav
	 	this.setState(prevState => {
	 		const { sideNavVisible } = prevState
	 		return {
	 			sideNavVisible: !sideNavVisible
	 		}
	 	})

	render() {
		const { sideNavVisible } = this.state
		const { auth, profile } = this.props
		const desktopLinks = auth.uid ? <DesktopSignedInLinks profile={profile} /> : <DesktopSignedOutLinks />
		const mobileLinks = auth.uid ? (
			<MobileSignedInLinks showOrHideMenu={this.showOrHideMenu} />
		) : (
			<MobileSignedOutLinks showOrHideMenu={this.showOrHideMenu} />
		) 

		return (
			<header>
				<nav className="nav-wrapper grey darken-3">
					<div className="container">
						<Link to="/" className="brand-logo">MessageBot</Link>
		
						{/*burger button*/}
						<button className="burger hide-on-large-only" onClick={this.showOrHideMenu}>
							<i className="material-icons">menu</i>
						</button>
						
						{/*desktop menu*/}
						<div className="right hide-on-med-and-down">
							{ desktopLinks }
						</div>

					</div>
				</nav>
		
				{/*mobile menu*/}
				<div className={ `mobile-menu grey darken-3 ${ !sideNavVisible ? 'hidden' : null }` }>
					{ mobileLinks }
				</div>
				
			</header>
		)
	}
	
	
}

const mapStateToProps = state => {
	console.log(state)
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(Navbar)
