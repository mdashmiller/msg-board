import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../store/actions/authActions'
import PropTypes from 'prop-types'

const MobileSignedInLinks = ({ toggleMenu, signOut }) => {

	const handleClick = link => {
		!link && signOut()
		toggleMenu('nav')
	}

	return (
		<ul className="mobile-links">
			<li><NavLink to="/create" onClick={() => handleClick(true)}>New Post</NavLink></li>
			<li><NavLink to="/signin" onClick={() => handleClick(false)}>Log Out</NavLink></li>
			<li><NavLink to="/edit" onClick={() => handleClick(true)}>My Profile</NavLink></li>
		</ul>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		signOut: () => dispatch(signOut())
	}
}

MobileSignedInLinks.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(MobileSignedInLinks)
