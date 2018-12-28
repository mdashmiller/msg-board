import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import EditProfile from './EditProfile'
import EditAuth from './EditAuth'

class EditHub extends Component {
	
	render() {
		const { auth } = this.props

		if (!auth.uid) return <Redirect to="/signin" />
			
		return (
			<div className="container">
				<EditProfile />
				<EditAuth />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth
	}
}

export default connect(mapStateToProps)(EditHub)
