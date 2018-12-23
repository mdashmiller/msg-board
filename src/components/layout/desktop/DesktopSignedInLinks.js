import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../store/actions/authActions'

const DesktopSignedInLinks = props => {
	return (
		<ul>
			<li><NavLink to="/create">New Post</NavLink></li>
			<li><NavLink to="/signin" onClick={props.signOut}>Log Out</NavLink></li>
			<li><NavLink to="/" className="btn btn-floating purple lighten-1">
				{ props.profile.initials }
			</NavLink></li>
		</ul>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(DesktopSignedInLinks)
