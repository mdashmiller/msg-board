import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileSignedOutLinks = ({ showOrHideMenu }) => {
	return (
		<ul className="mobile-links">
			<li><NavLink to="/signup" onClick={showOrHideMenu}>Sign Up</NavLink></li>
			<li><NavLink to="/signin" onClick={showOrHideMenu}>Log In</NavLink></li>
		</ul>
	)
}

export default MobileSignedOutLinks
